import { EventEmitter } from "events";
import BOTKEEPERSERVICE from "../BOTKEEPERSERVICE";
import {
  BotInstanceStatus,
  Business,
  BotEmittingEvents,
  IgIncomingEventData,
} from "../types";
import { IgApiClient } from "instagram-private-api";
import {
  withRealtime,
  withFbns,
  GraphQLSubscriptions,
  IgApiClientRealtime,
  SkywalkerSubscriptions,
  //SkywalkerSubscriptions,
} from "instagram_mqtt";
import shttps from "socks-proxy-agent";
import { getUserID } from "../DATASERVICE/utility";
import { writeFileSync } from "fs";
import { BotBehavior } from "./BotBehavior";
import { advancedLogging } from "../DATASERVICE/logger";

export default class BotInstance extends EventEmitter {
  botBehavior: BotBehavior;
  igClient: IgApiClientRealtime;
  _business: Business;
  set business(b) {
    // check for changes and trigger functions / events

    // BOT SHOULD BE TURNED ON OR OFF:
    let oldActivated = this._business.business_settings.ig_settings
      .ig_behavior_settings.activated;
    let newActivated =
      b.business_settings.ig_settings.ig_behavior_settings.activated;
    if (oldActivated && !newActivated) {
      // bot should be turned off:
      this.turnOff();
    }
    if (!oldActivated && newActivated) {
      // bot should be turned off:
      this.turnOn();
    }
    // in the end update _business
    this._business = b;
  }
  get business() {
    return this._business;
  }

  get botInstanceStatus() {
    return this._business.business_data.ig_data.bot_instance_status;
  }
  set botInstanceStatus(val: BotInstanceStatus) {
    let change =
      this._business.business_data.ig_data.bot_instance_status != val;
    // updates the status automatically in the database:
    if (change) {
      this._business.business_data.ig_data.bot_instance_status = val;
      this.botKeeperService.STARTUPPERFORMER.dataService.updateBusinessData(
        this.business
      );
    }

    // also sends message to clients via websocket that status has changed:
  }

  botKeeperService: BOTKEEPERSERVICE;
  constructor(botKeeperService: BOTKEEPERSERVICE, business: Business) {
    super();
    this._business = business;
    this.botKeeperService = botKeeperService;

    // BOTBEHAVIOR:
    // The botkeeperService has a dictionairy with all the bot behaviors currently available and assigns the correct bot-behavior:
    this.botBehavior = this.botKeeperService.getBotBehavoir(this);

    // DEVICE SETUP
    // create a new Device to run Instagram on, Ig Client Setup and settings, no connections yet:
    this.igClient = withRealtime(new IgApiClient());
    this.igClient.state.generateDevice(
      this.business.business_settings.ig_settings.username
    );

    if (this.botKeeperService.SETTINGS.USEPROXY) {
      this.igClient.request.defaults.agentClass = shttps;
      this.igClient.request.defaults.agentOptions = {
        // @ts-ignore
        hostname: this.botKeeperService.SETTINGS.PROXYHOST,
        port: parseInt(this.botKeeperService.SETTINGS.PROXYPORT),
        protocol: "socks5:",
      };
    }
  }

  // run is supposed to be called after everything is set up. Turns the bot on if settings are in favor of it.
  async run() {
    if (
      this._business.business_settings.ig_settings.ig_behavior_settings
        .activated &&
      this.botKeeperService.SETTINGS.CONNECTTOINSTAGRAM
    ) {
      await this.turnOn();
    }
  }

  async die() {
    console.log(
      `botInstance for business ${this.business.slugname} with id ${this.business.id} is shutting down and removed from memory.`
    );
  }

  async turnOff() {
    console.log(`$BOT::${this.business.slugname} is turning off...`);
    this.botInstanceStatus = BotInstanceStatus.INACTIVE;
  }
  async turnOn() {
    console.log(`$BOT::${this.business.slugname} is turning on...`);
    this.botInstanceStatus = BotInstanceStatus.ACTIVE;

    // LOGGING IN
    // determine if session store would be available to log in via it:
    let session = this.business.business_data.ig_data.ig_session_store;
    //console.log("session : ", session);
    let loggedIn = false; // _________
    if (true) {
      loggedIn = await this.igSessionLogin(session);
    } else {
      loggedIn = await this.igPasswordLogin();
    }
    let realtimeConnectionSuccessful = false;
    if (loggedIn) {
      realtimeConnectionSuccessful = await this.makeRealTimeConnection();
    }
    // continue only if login and realtime connection was successfull:
    if (realtimeConnectionSuccessful) {
      // await this.testIfLoggedIn();
    }
  }

  async igSessionLogin(session: any) {
    try {
      console.log(`logging in sessionstore from database`);
      // login

      let sessionClone = JSON.parse(JSON.stringify(session)); // because igClient.state.deserialize() modifies the object itself
      await this.igClient.simulate.preLoginFlow();
      await this.igClient.state.deserialize(sessionClone);
      process.nextTick(
        async () => await this.igClient.simulate.postLoginFlow()
      );
      // update ig_data in database
      this.business.business_data.ig_data.last_session_login = new Date();
      this.business.business_data.ig_data.ig_user_id = getUserID(session);
      await this.botKeeperService.STARTUPPERFORMER.dataService.updateBusinessData(
        this.business
      );
      return true;
    } catch (ex) {
      console.error(ex);
      return false;
    }
  }

  async igPasswordLogin() {
    try {
      console.log(
        `BOT::${this.business.slugname} is logging in with username ${this.business.business_settings.ig_settings.username} and password ********...`
      );
      // login
      await this.igClient.account.login(
        this.business.business_settings.ig_settings.username,
        this.business.business_settings.ig_settings.password
      );
      // update ig_data in database, save session for later, to not have to login again but use the session file:
      const session = await this.igClient.state.serialize();
      writeFileSync("sessionwithall.json", JSON.stringify(session));
      this.business.business_data.ig_data.ig_user_id = getUserID(session);
      delete session.constants;
      writeFileSync("session.json", JSON.stringify(session));
      this.business.business_data.ig_data.ig_session_store = session;
      this.business.business_data.ig_data.last_password_login = new Date();
      this.business.business_data.ig_data.last_session_login = new Date(); // is also set because password login basically create a session login
      await this.botKeeperService.STARTUPPERFORMER.dataService.updateBusinessData(
        this.business
      );
      return true;
    } catch (ex) {
      console.error(ex);
      return false;
    }
    // return { session, sessionUser / ig_user_id };
  }

  async testIfLoggedIn() {
    try {
      console.log("_____inbox:________________________");
      const inbox = await this.igClient.feed.directInbox().request();
      console.log(inbox);
      writeFileSync("./IgTestFile.json", JSON.stringify(inbox));
    } catch (ex) {
      console.error(ex);
    }
  }

  async makeRealTimeConnection() {
    try {
      let thisReference = this;
      this.igClient.realtime.on(
        "message",
        this.realTimeEventMessage(thisReference)
      );
      this.igClient.realtime.on(
        "receive",
        this.realTimeEventReceive(thisReference)
      );
      this.igClient.realtime.on("realtimeSub", this.realTimeEventSub);
      this.igClient.realtime.on("error", this.realTimeEventError);
      this.igClient.realtime.on("close", this.realTimeEventClose);
      await this.igClient.realtime.connect({
        graphQlSubs: [
          GraphQLSubscriptions.getAppPresenceSubscription(),
          GraphQLSubscriptions.getZeroProvisionSubscription(
            this.igClient.state.phoneId
          ),
          GraphQLSubscriptions.getDirectStatusSubscription(),
          GraphQLSubscriptions.getDirectTypingSubscription(
            this.igClient.state.cookieUserId
          ),
          GraphQLSubscriptions.getAsyncAdSubscription(
            this.igClient.state.cookieUserId
          ),
          // Experimental
        ],
        // experimental:
        skywalkerSubs: [
          SkywalkerSubscriptions.directSub(this.igClient.state.cookieUserId),
          SkywalkerSubscriptions.liveSub(this.igClient.state.cookieUserId),
        ],
        //..................... experimental end

        irisData: await this.igClient.feed.directInbox().request(),
        connectOverrides: {},
      });

      console.log("realtime connection established.");
      return true;
    } catch (ex) {
      console.error(ex);
      return false;
    }
  }

  realTimeEventReceive(botReference: BotInstance) {
    // proved to be pretty useless actually
    return async (data: any) => {
      advancedLogging("realTimeEventReceive", data);
    };
  }

  // REALTIME EVENTS PROCESSING AND FORWARDING TO BotBehavior:
  realTimeEventMessage(botReference: BotInstance) {
    return async (data: any) => {
      // 1. PROCESS INCOMING DATA AND CREATE eventData Object

      let eventData: IgIncomingEventData = {
        date: new Date(),
        type: BotEmittingEvents.Unidentified,
      };
      let item_type = data.message.item_type;
      eventData.type = data?.message?.item_type;
      if (item_type == "reel_share" || item_type == "text") {
        eventData.user_id = data.message.user_id;
        eventData.thread_id = data.message.thread_id;
        eventData.item_id = data.message.item_id;
        if (item_type == "text") {
          eventData.type = BotEmittingEvents.DirectMessage;
          eventData.text = data.message.text;
        } else if (item_type == "reel_share") {
          eventData.text = data.message?.reel_share?.media?.caption?.text;
          if (data.message?.reel_share?.type == "mention") {
            eventData.type = BotEmittingEvents.StoryMention;
            /*
            eventData.username =
              data.message?.reel_share?.media?.user?.username;
            eventData.full_name =
              data.message?.reel_share?.media?.user?.full_name;
            */
          }
        }
      }

      // 1.5 FUNCTIONS FOR ANALYSING EVENT DATA:

      function eventDataIndicatesNormalDirectMessage(
        eventData: IgIncomingEventData
      ) {
        let tf: boolean = true;
        if (eventData.type != BotEmittingEvents.DirectMessage) return false;
        // (case for outgoing messages that throw event: )
        if (
          botReference.business.business_data.ig_data.ig_user_id.toString() ==
          eventData.user_id?.toString()
        )
          return false;
        if (!eventData.text || !eventData.thread_id || !eventData.item_id)
          return false;
        return tf;
      }

      function eventDataIndicatesStoryMention(eventData: IgIncomingEventData) {
        let tf: boolean = true;
        if (eventData.type != BotEmittingEvents.StoryMention) return false;
        // (case for outgoing messages that throw event: )
        if (
          botReference.business.business_data.ig_data.ig_user_id.toString() ==
          eventData.user_id?.toString()
        )
          return false;
        if (!eventData.text || !eventData.thread_id || !eventData.item_id)
          return false;
        return tf;
      }

      // 2. ACT IN A CERTAIN WAY IF EVENTDATA MEETS SPECIAL CRITERIA:
      if (
        eventDataIndicatesNormalDirectMessage(eventData) ||
        eventDataIndicatesStoryMention(eventData)
      )
        botReference.emit(eventData.type, eventData);
    };
  }

  async realTimeEventSub(data: any): Promise<void> {
    // dont know exactly yet, what this is for. Typing and other direct messages related stuff.
    /*
    console.log("realtimesub: ---------------------------------------");
    console.log(data);
    console.log("_------------------------------------------------------");
    */

    advancedLogging("realTimeEventSub", data);
  }

  async realTimeEventError(e: Error): Promise<void> {
    try {
      throw e;
    } catch (ex) {
      console.error(ex);
    }
  }

  async realTimeEventClose(): Promise<void> {
    console.log("realtime connection closed from instagram");
  }

  log(content: any) {
    console.log(`BOT::${this.business.slugname}: `, content);
  }
  logerr(content: any) {
    console.log(`ERROR IN BOT::${this.business.slugname}`);
    console.error(content);
  }
}

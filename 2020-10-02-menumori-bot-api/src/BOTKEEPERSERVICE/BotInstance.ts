import { EventEmitter } from "events";
import BOTKEEPERSERVICE from "../BOTKEEPERSERVICE";
import {
  BotInstanceStatus,
  Business,
  BotEmittingEvents,
  IgIncomingEventData,
  BotOnlineStatus,
} from "../types";
import { DirectThreadEntity, IgApiClient } from "instagram-private-api";
import {
  withRealtime,
  withFbns,
  GraphQLSubscriptions,
  IgApiClientRealtime,
  SkywalkerSubscriptions,
  //SkywalkerSubscriptions,
} from "instagram_mqtt";
import shttps from "socks-proxy-agent";
import {
  getUserID,
  randomizeNumber,
  waitPromise,
  waitPromiseRandomizeTime,
} from "../DATASERVICE/utility";
import { writeFileSync } from "fs";
import { BotBehavior } from "./BotBehavior";
import { advancedLogging } from "../DATASERVICE/logger";
import { randomInt } from "crypto";
import { threadId } from "worker_threads";

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
      val != this._business.business_data.ig_data.bot_instance_status;
    // updates the status automatically in the database:
    if (change) {
      this._business.business_data.ig_data.bot_instance_status = val;
      if (val == BotInstanceStatus.INACTIVE || val == BotInstanceStatus.ERROR) {
        this._business.business_data.ig_data.bot_online_status =
          BotOnlineStatus.OFFLINE;
      }
      this.botKeeperService.STARTUPPERFORMER.dataService.updateBusinessData(
        this.business
      );

      // also sends message to clients via websocket that status has changed:
    }
  }

  get botOnlineStatus() {
    return this._business.business_data.ig_data.bot_online_status;
  }

  set botOnlineStatus(val: BotOnlineStatus) {
    let change = val != this._business.business_data.ig_data.bot_online_status;
    if (change) {
      this._business.business_data.ig_data.bot_online_status = val;
      this.botKeeperService.STARTUPPERFORMER.dataService.updateBusinessData(
        this.business
      );
    }
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
    this.log("run start...");
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

  /**
   * sends Foregroundstate to instagram realtime client to act like bot is online or online. Also updates bot_online_status in database.
   * Warning: If changed to offline, we no longer receive live actions/messages from instagram, so we better only turn it offline for each business, when it is closed.
   * This function should only be implemented by the ScheduleWatcher of the BotKeeperService.
   * @param val BotOnlineStatus, can be "ONLINE" or "OFFLINE"
   */
  async changeInstagramForegroundState(val: BotOnlineStatus) {
    // console.log(`change instagram foreground state to: ${val}`);
    // if bot is not even running return right away:
    if (this.botInstanceStatus != BotInstanceStatus.ACTIVE) {
      this.botKeeperService.STARTUPPERFORMER.dataService.handleException(
        {
          message: `BOT::${this.business.slugname} was tried to be called changeInstagramForegroundState("${val}") on, even though its status is currently not BotInstanceStatus.ACTIVE`,
        },
        0
      );
      return;
    }
    // only act if value was changed:
    let change = val != this.botOnlineStatus;
    if (change) {
      this.botOnlineStatus = val;
      try {
        if (val === BotOnlineStatus.OFFLINE) {
          await this.igClient.realtime.direct.sendForegroundState({
            inForegroundApp: false,
            inForegroundDevice: false,
            keepAliveTimeout: 900,
          });
          this.botKeeperService.STARTUPPERFORMER.dataService.handleException(
            {
              message: `BOT::${this.business.slugname} successfully was set to Instagram ForeGroundState ${val}`,
            },
            0
          );
        } else if (val === BotOnlineStatus.ONLINE) {
          await this.igClient.realtime.direct.sendForegroundState({
            inForegroundApp: true,
            inForegroundDevice: true,
            keepAliveTimeout: 60,
          });
          this.botKeeperService.STARTUPPERFORMER.dataService.handleException(
            {
              message: `BOT::${this.business.slugname} successfully was set to Instagram ForeGroundState ${val}`,
            },
            0
          );
        }
      } catch (ex) {
        this.botKeeperService.STARTUPPERFORMER.dataService.handleException(
          ex,
          2
        );
      }
    }
  }

  async turnOff() {
    console.log(`$BOT::${this.business.slugname} is turning off...`);
    this.botInstanceStatus = BotInstanceStatus.INACTIVE;
  }
  async turnOn() {
    try {
      let session = this.business.business_data.ig_data.ig_session_store;
      if (!session) {
        throw new Error(
          `$BOT::${this.business.slugname} tried to turn on, but no session is available to use as login.`
        );
      }
      console.log(`$BOT::${this.business.slugname} is turning on...`);
      this.botInstanceStatus = BotInstanceStatus.ACTIVE;
      // LOGGING IN
      // always log in via session store. If none is available, we need to fetch one manually
      let loggedIn = await this.igSessionLogin(session);
      let realtimeConnectionSuccessful = false;
      if (loggedIn) {
        realtimeConnectionSuccessful = await this.makeRealTimeConnection();
      }
      if (realtimeConnectionSuccessful) {
        this.botOnlineStatus = BotOnlineStatus.ONLINE;
        console.log(
          `$BOT::${this.business.slugname} login with session store was successful!`
        );
        // ... fetch initial data or something ...
        // ... currently not in use ...
      }
    } catch (ex) {
      this.botKeeperService.STARTUPPERFORMER.dataService.handleException(ex);
    }
  }

  async igSessionLogin(session: any) {
    try {
      console.log(
        `$BOT::${this.business.slugname} is logging in with sessionstore from database`
      );

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
      this.botKeeperService.STARTUPPERFORMER.dataService.handleException(ex, 3);
      return false;
    }
  }

  async igPasswordLogin() {
    try {
      let igUsername = this.business.business_settings.ig_settings.username;
      let igPassword = this.business.business_settings.ig_settings.password;
      console.log(
        `BOT::${this.business.slugname} performs igPasswordLogin() with username: ${igUsername} and password: ${igPassword}`
      );

      if (!(igUsername && igPassword)) {
        throw new Error(
          `BOT::${this.business.slugname} tried to perform igPasswordLogin() with username: ${igUsername} and password: ${igPassword} but at least one of them was not set.`
        );
      }

      // login
      await this.igClient.account.login(igUsername, igPassword);
      // update ig_data in database, save session for later, to not have to login again but use the session file:
      const session = await this.igClient.state.serialize();
      writeFileSync(
        `./logs/BOT-${this.business.slugname}-session-with-constants.json`,
        JSON.stringify(session)
      );
      this.business.business_data.ig_data.ig_user_id = getUserID(session);
      delete session.constants;
      writeFileSync(
        `./logs/BOT-${this.business.slugname}-session.json`,
        JSON.stringify(session)
      );

      this.business.business_data.ig_data.ig_session_store = session;
      this.business.business_data.ig_data.last_password_login = new Date();
      this.business.business_data.ig_data.last_session_login = new Date(); // is also set because password login basically create a session login
      await this.botKeeperService.STARTUPPERFORMER.dataService.updateBusinessData(
        this.business
      );
      return session;
    } catch (ex) {
      this.botKeeperService.STARTUPPERFORMER.dataService.handleException(ex, 4);
      return null;
    }
    // return { session, sessionUser / ig_user_id };
  }

  async testIfLoggedIn() {
    try {
      console.log("_____inbox:_____");
      const inbox = await this.igClient.feed.directInbox().request();
      console.log(inbox);
      writeFileSync("./IgTestFile.json", JSON.stringify(inbox));
    } catch (ex) {
      this.botKeeperService.STARTUPPERFORMER.dataService.handleException(ex, 2);
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
        /*
        skywalkerSubs: [
          SkywalkerSubscriptions.directSub(this.igClient.state.cookieUserId),
          SkywalkerSubscriptions.liveSub(this.igClient.state.cookieUserId),
        ],
        */
        //..................... experimental end

        irisData: await this.igClient.feed.directInbox().request(),
        connectOverrides: {},
      });

      console.log("realtime connection established.");
      return true;
    } catch (ex) {
      this.botKeeperService.STARTUPPERFORMER.dataService.handleException(ex, 3);
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

            // if mention: get the media url, to save the image/video posted in the story:
            let mediaCanditates =
              data.message?.reel_share?.media.image_versions2.candidates;
            if (
              Array.isArray(mediaCanditates) &&
              mediaCanditates.length >= 1 &&
              mediaCanditates[0].url
            ) {
              eventData.media_url = mediaCanditates[0].url;
            }
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
      this.botKeeperService.STARTUPPERFORMER.dataService.handleException(ex, 2);
    }
  }

  async realTimeEventClose(): Promise<void> {
    console.log(
      "BOT::${this.business.slugname}: realTimeEventClose() triggered, realtime connection closed from instagram"
    );
  }

  log(content: any) {
    console.log(`BOT::${this.business.slugname}: `, content);
  }
  logerr(content: any) {
    console.log(`ERROR IN BOT::${this.business.slugname}`);
    console.error(content);
  }

  async sendDirectMessage(content_text: string, thread: DirectThreadEntity) {
    try {
      /*
      // is pretending to be a realistically typing user: 
      let estimatedTime = content_text.length / 17 * 1000 // 8 characters per second is a pretty fast typing speed.
      let totaltime = randomizeNumber(estimatedTime * 0.7, estimatedTime * 1.3);
      console.log(totaltime)
      // divide time up into chunks, to send out a typing event every few seconds:
      // chunks should be 50 characters long so every 4 words or so:
      // those numbers are pure guesswork, maybe its besser to send an event after every letter but we dont really know.
      let estimatedNumberOfChunks = content_text.length / 50;
      let numberOfChunks = randomizeNumber(estimatedNumberOfChunks * 0.6, estimatedNumberOfChunks * 1.6)
      // get arry of times that should be waited after every typing event. sums up to totaltime
      let arr: number[] = [totaltime];
      // set chunks - 1 cuts in total:
      for (let i = 0; i < numberOfChunks - 1; i++) {
        let randomIndex = Math.floor(Math.random() * arr.length);
        let timeElement = arr.splice(randomIndex, 1)[0];
        // fraction between 0.25 and 0.75
        let fraction = Math.floor(Math.random() * timeElement / 2 + timeElement / 4);
        // push the two times to the end of the array:
        arr.push(timeElement - fraction, fraction);
      }
      console.log(arr)

      for (let i = 0; i < arr.length; i++) {
        // indicate typing then wait t milliseconds:
        // this is not awaited to keep the totaltime accurate. I hope this doesnt lead to overlapping indicateActivity() receivings on instagrams side

        await this.igClient.realtime.direct.indicateActivity({ threadId: thread.threadId });
        console.log("indicateactivity...");
        await waitPromise(arr[i]);

      }

      // finally send the message: 

      */

      // was way too compliceted, lets keep it very simple:
      // (I tried to make it more complicated, split up in chunks and all so that it is harder to detect for instagram. But this solutions looks best for now.)
      // bei unserer Testmessage: 273 chars sollte 4 bis 8 Sekunden dauern, damit Nutzer ein gutes Gefühl haben (aber ist eigentlich zu schnell für Menschen)

      let timeToDelivery = content_text.length * 15; // in ms

      this.igClient.realtime.direct.indicateActivity({
        threadId: thread.threadId,
        isActive: true,
      });

      await waitPromiseRandomizeTime(timeToDelivery, timeToDelivery * 2); // between 8 and 13 seconds;
      await thread.broadcastText(content_text);
    } catch (ex) {
      this.botKeeperService.STARTUPPERFORMER.dataService.handleException(ex, 3);
    }
  }

  async sendPhoto(photoAsBuffer: Buffer, thread: DirectThreadEntity) {
    // write down file and read it again to get encoding right:
    // send it in the dm-thread
  }
}

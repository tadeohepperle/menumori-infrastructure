import {
  IgAction,
  IgIncomingEventData,
  IgLead,
  BotEmittingEvents,
  Business,
  IgActionFlag,
} from "../types";
import BotInstance from "./BotInstance";
import DATASERVICE from "../DATASERVICE";
import { IgLoginTwoFactorRequiredError } from "instagram-private-api";
export class BotBehavior {
  botInstance: BotInstance;
  dataService: DATASERVICE;
  constructor(bi: BotInstance) {
    this.botInstance = bi;
    this.dataService = bi.botKeeperService.STARTUPPERFORMER.dataService;
  }

  // events of Botinstance trigger those functions:

  onStoryMention(eventData: IgIncomingEventData): void {}
  onPostMention(eventData: IgIncomingEventData): void {}
  onDirectMessage(eventData: IgIncomingEventData): void {}
  onSubscribe(eventData: IgIncomingEventData): void {}
  onPostLike(eventData: IgIncomingEventData): void {}

  async createAndSaveOrUpdateLeadAndCreateAndSaveIncomingIgAction(
    eventData: IgIncomingEventData
  ): Promise<{ ig_action: IgAction; lead: IgLead }> {
    const lead = await this.createAndSaveOrUpdateLeadForEventData(eventData);
    if (!lead)
      throw new Error(
        `tried to create or update lead for eventData ${JSON.stringify(
          eventData
        )} but createOrUpdateLeadForEventData(eventData) returned null.`
      );
    const ig_action = await this.createAndSaveIncomingIgAction(eventData, lead);
    if (!ig_action) {
      throw new Error(
        `tried to create ig-action ${JSON.stringify(
          ig_action
        )} but createAndSaveIncomingIgAction(eventData) returned null.`
      );
    }
    return { lead, ig_action };
  }

  async createAndSaveIncomingIgAction(
    eventData: IgIncomingEventData,
    lead: IgLead
  ): Promise<IgAction | null> {
    let ig_actionPrototype: IgAction = {
      business: this.botInstance.business.id,
      lead: lead.id,
      direction_b_to_l: false,
      action_type: eventData.type,
      confirmed: true,
      content_text: eventData.text,
      thread_id: eventData.thread_id,
      item_id: eventData.item_id,
    };

    let record = await this.dataService.postRecord(
      "ig-actions",
      ig_actionPrototype
    );
    if (record) return record as IgAction;
    else return null;
  }

  // utilityfunctions:

  async postIgActionRecordForBotsentMessage(
    lead: IgLead,
    content_text: string,
    thread_id: string,
    action_type: BotEmittingEvents,
    flag: IgActionFlag
  ) {
    try {
      {
        let agbMessageAction = {
          business: this.botInstance.business.id,
          lead: lead.id,
          direction_b_to_l: true,
          content_text,
          thread_id,
          action_type,
          flag,
        } as IgAction;
        await this.dataService.postRecord("ig-actions", agbMessageAction);
      }
    } catch (ex) {
      console.error(ex);
    }
  }

  async createAndSaveOrUpdateLeadForEventData(
    eventData: IgIncomingEventData
  ): Promise<IgLead | null> {
    // check again that eventData contains all properties needed:
    if (!eventData.user_id) return null;
    // if the type of event is a storymention we request and save all the user account data and save it in lead object.
    // We only do that on story mentions, representing the initial contact, after that the data gets old. I dont think we should renew it with every directmessage and stuff...

    let userInfo;
    if (
      (eventData.type == BotEmittingEvents.StoryMention ||
        eventData.type == BotEmittingEvents.PostMention) &&
      this.botInstance.botKeeperService.SETTINGS.CONNECTTOINSTAGRAM
    ) {
      userInfo = await this.botInstance.igClient.user.info(eventData.user_id);
    }
    // look if lead with this user_id already exists:
    let leadRecords = await this.dataService.getRecords("leads", {
      user_id: eventData.user_id,
    });
    let lead: IgLead;
    try {
      if (leadRecords.length > 1) {
        throw new Error(
          `more than 1 lead (${leadRecords.length}) found in db with user_id ${eventData.user_id}`
        );
      } else if (leadRecords.length == 1) {
        // found a lead with dame userid:
        let newlead = leadRecords[0] as IgLead;
        // update data for this lead:
        newlead = fillLeadWithUserInfo(newlead, userInfo);
        // ( test if lead is already assigned to the business teh person is at right now: )
        let firstVisit = !newlead.businesses.some(
          (el) => typeof el != "string" && el.id == this.botInstance.business.id
        );
        if (firstVisit) newlead.businesses.push(this.botInstance.business.id);
        lead = (await this.dataService.updateRecord(
          "leads",
          newlead
        )) as IgLead;
        return lead;
      } else {
        // create new lead:
        let newlead = {
          user_id: eventData.user_id,
        };
        newlead = fillLeadWithUserInfo(newlead, userInfo);
        // post lead to database and retrieve the result:
        lead = (await this.dataService.postRecord("leads", newlead)) as IgLead;
        return lead;
      }
    } catch (ex) {
      this.botInstance.logerr(ex);
      return null;
    }
  }
}

function fillLeadWithUserInfo(lead: any, userInfo: any) {
  // fields that should be transfered from userInfo to lead;
  if (!userInfo) return lead;
  let fields = [
    "username",
    "biography",
    "profile_pic_url",
    "full_name",
    "media_count",
    "follower_count",
    "following_count",
    "mutual_followers_count",
    "is_verified",
    "is_private",
    "has_anonymous_profile_picture",
    "following_tag_count",
    "external_url",
    "is_business",
    "whatsapp_number",
  ];
  fields.forEach((f) => {
    lead[f] = userInfo[f];
  });
  return lead;
}

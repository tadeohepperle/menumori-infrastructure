import { writeFileSync } from "fs";
import { addSyntheticLeadingComment } from "typescript";
import DATASERVICE from "../../DATASERVICE";
import {
  addHoursToDate,
  createAGBLink,
  createGoogleRatingLink,
  getVorname,
  isComplyText,
  pythonStringFormat,
  waitPromise,
  waitPromiseRandomizeTime,
} from "../../DATASERVICE/utility";
import {
  IgIncomingEventData,
  IgLead,
  IgAction,
  BotEmittingEvents,
  IgActionFlag,
} from "../../types";
import { BotBehavior } from "../BotBehavior";
import BotInstance from "../BotInstance";

export default class IgBotV20201004 extends BotBehavior {
  constructor(bi: BotInstance) {
    super(bi);
  }

  async onStoryMention(eventData: IgIncomingEventData) {
    console.log(eventData);
    try {
      // create/update lead and create ig_action in database:
      const {
        lead,
        ig_action,
      } = await this.createAndSaveOrUpdateLeadAndCreateAndSaveIncomingIgAction(
        eventData
      );
      await this.sendAGBMessage(lead, ig_action);

      // react to the storymention:
      console.log("STORYMENTION.");
    } catch (ex) {
      console.error(ex);
    }
  }

  async onPostMention() {
    // ...
  }
  async onDirectMessage(eventData: IgIncomingEventData) {
    console.log(eventData);
    // create/update lead and create ig_action in database:
    try {
      const {
        lead,
        ig_action,
      } = await this.createAndSaveOrUpdateLeadAndCreateAndSaveIncomingIgAction(
        eventData
      );
      // check if it is the agb message
      let isComplyMessage = await this.checkIfIgActionIsAGBComply(
        lead,
        ig_action
      );
      // if isComplyMessage, we react with agb_complied_reply1 and agb_complied_reply2
      if (isComplyMessage) {
        await this.replyToAGBComply(lead, ig_action);
      }
      console.log("DM RECEIVED.");
    } catch (ex) {
      console.error(ex);
    }
  }

  async onSubscribe() {
    console.log("onSubscribe");
  }

  async onPostLike() {
    // ...
  }

  //////////////////////////////////////////////////
  // actions:

  async replyToAGBComply(lead: IgLead, ig_action: IgAction) {
    // GENERATE TEXTS TO SEND BACK TO CUSTOMER:
    if (!lead.full_name)
      throw Error(
        `tried to execute replyToAGBComply with lead ${JSON.stringify(
          lead
        )} and ig_action ${JSON.stringify(
          ig_action
        )} but lead has no full_name!`
      );
    let agb_complied_reply1 = this.botInstance.business.business_settings
      .ig_settings.ig_behavior_settings.agb_complied_reply1;
    agb_complied_reply1 = pythonStringFormat(agb_complied_reply1, {
      vorname: getVorname(lead.full_name),
      link: createGoogleRatingLink(
        this.botInstance.botKeeperService.SETTINGS,
        this.botInstance.business
      ),
    });

    let agb_complied_reply2 = this.botInstance.business.business_settings
      .ig_settings.ig_behavior_settings.agb_complied_reply2;

    agb_complied_reply2 = pythonStringFormat(agb_complied_reply2, {
      vorname: getVorname(lead.full_name),
      link: createGoogleRatingLink(
        this.botInstance.botKeeperService.SETTINGS,
        this.botInstance.business
      ),
    });

    // EXECUTE COMMUNICATION WITH INSTAGRAM SERVICES:
    if (ig_action.thread_id && ig_action.item_id) {
      let thread = this.botInstance.igClient.entity.directThread(
        ig_action.thread_id
      );
      // mark message as seen:
      await waitPromiseRandomizeTime(400, 1700);
      await thread.markItemSeen(ig_action.item_id);
      await waitPromiseRandomizeTime(200, 1500);
      // start typing and send agb_complied_reply1:
      if (agb_complied_reply1) {
        await this.botInstance.sendDirectMessage(agb_complied_reply1, thread);
        this.postIgActionRecordForBotsentMessage(
          lead,
          agb_complied_reply1,
          ig_action.thread_id,
          BotEmittingEvents.DirectMessage,
          IgActionFlag.B_AGB
        );
      }
      if (agb_complied_reply2) {
        await this.botInstance.sendDirectMessage(agb_complied_reply2, thread);
        this.postIgActionRecordForBotsentMessage(
          lead,
          agb_complied_reply2,
          ig_action.thread_id,
          BotEmittingEvents.DirectMessage,
          IgActionFlag.B_AGB
        );
      }
      await this.prepareTicketAndSendItAfterSomeTime(lead, ig_action);
    }
  }

  async checkIfIgActionIsAGBComply(
    lead: IgLead,
    ig_action: IgAction
  ): Promise<boolean> {
    let correctComplyText = this.botInstance.business.business_settings
      .ig_settings.ig_behavior_settings.comply_text;
    // get all interactions from database:
    let pastInteractions = (await this.dataService.getRecords("ig-actions", {
      business: this.botInstance.business.id,
      lead: lead.id,
      _sort: "createdAt:DESC",
      _limit: 10,
    })) as IgAction[];
    // get AGB Messages and check if max 2 Stunden her.
    let agbMessageActionArray = pastInteractions.filter(
      (inter) =>
        inter.flag == IgActionFlag.B_AGB &&
        inter.direction_b_to_l == true &&
        ig_action.createdAt &&
        inter.createdAt &&
        addHoursToDate(new Date(ig_action.createdAt), 3) >
          new Date(inter.createdAt)
    );
    if (agbMessageActionArray.length >= 1 && ig_action.content_text) {
      let agbMessageAction = agbMessageActionArray[0];
      // cheack if the content of ig_action is the content reply we want to see:
      if (isComplyText(ig_action.content_text, correctComplyText)) {
        // set flag on igActionRecordInDatabase:
        ig_action.flag = IgActionFlag.C_AGBCOMPLY;
        this.dataService.updateRecord("ig-actions", ig_action);
        return true;
      }
      /*
      if (ig_action.createdAt && agbMessageAction.createdAt) {
        console.log(new Date(ig_action.createdAt));
        console.log(new Date(agbMessageAction.createdAt));
      }
      */
    }
    return false;
  }

  async sendAGBMessage(lead: IgLead, ig_action: IgAction) {
    try {
      if (!lead.full_name)
        throw new Error(
          `full_name of lead ${JSON.stringify(
            lead
          )} unknown, cant send AGB message`
        );

      // CONSTRUCT AGB TEXT:

      let behaviorSettings = this.botInstance.business.business_settings
        .ig_settings.ig_behavior_settings;
      let textTemplate = behaviorSettings.story_mention_reply1;
      let parameters = {
        vorname: getVorname(lead.full_name),
        link: createAGBLink(
          this.botInstance.botKeeperService.SETTINGS,
          this.botInstance.business
        ),
        comply_text: behaviorSettings.comply_text,
      };
      let textToSend = pythonStringFormat(textTemplate, parameters);
      console.log(textToSend);

      // NACHRICHT ALS GESEHEN MARKIEREN:

      if (!ig_action.thread_id || !ig_action.item_id)
        throw new Error(
          `thread_id or item_id on igAction ${JSON.stringify(
            ig_action
          )} is missing, cannot send AGB message.`
        );
      let thread = this.botInstance.igClient.entity.directThread(
        ig_action.thread_id
      );
      console.log("thread:", thread);
      console.log("ig_action.thread_id", ig_action.thread_id);
      // ????? markasssen does not work for stories!!!! --> questionable?????
      await waitPromiseRandomizeTime(2000, 4000);
      console.log("beforemarkitemseen");

      console.log(ig_action);
      await thread.markItemSeen(ig_action.item_id);
      //thread.markItemSeen(ig_action.item_id);
      console.log("markitemseen");
      await waitPromiseRandomizeTime(1000, 3500);
      // NACHRICHT SENDEN
      console.log("beforedirectmessage");
      await this.botInstance.sendDirectMessage(textToSend, thread);

      // SAVE ACTION TO DATABASE:

      await this.postIgActionRecordForBotsentMessage(
        lead,
        textToSend,
        ig_action.thread_id,
        BotEmittingEvents.DirectMessage,
        IgActionFlag.B_AGB
      );
    } catch (ex) {
      console.error(ex);
    }
  }

  async prepareTicketAndSendItAfterSomeTime(lead: IgLead, ig_action: IgAction) {
    // generateTicket:
    // ... promise
    await waitPromiseRandomizeTime(80 * 1000, 100 * 1000);
    // ... send Ticket wenn Zeit und GenerateTicket Promise beide um sind.
  }
}

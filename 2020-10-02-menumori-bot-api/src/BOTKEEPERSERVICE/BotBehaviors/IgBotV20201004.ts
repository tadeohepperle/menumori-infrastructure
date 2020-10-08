import { addSyntheticLeadingComment } from "typescript";
import DATASERVICE from "../../DATASERVICE";
import {
  IgIncomingEventData,
  IgLead,
  IgAction,
  BotEmittingEvents,
} from "../../types";
import { BotBehavior } from "../BotBehavior";
import BotInstance from "../BotInstance";

export default class IgBotV20201004 extends BotBehavior {
  constructor(bi: BotInstance) {
    super(bi);
  }

  async onStoryMention(eventData: IgIncomingEventData) {
    try {
      console.log(eventData);
      // create/update lead and create ig_action in database:
      const {
        lead,
        ig_action,
      } = await this.createAndSaveOrUpdateLeadAndCreateAndSaveIncomingIgAction(
        eventData
      );

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
    const {
      lead,
      ig_action,
    } = await this.createAndSaveOrUpdateLeadAndCreateAndSaveIncomingIgAction(
      eventData
    );
    // possibly react to the direct message:
    console.log("DM RECEIVED.");
  }
  async onSubscribe() {
    console.log("onSubscribe");
  }
  async onPostLike() {
    // ...
  }
}

import { BotBehavior } from "./BOTKEEPERSERVICE/BotBehavior";
import BotInstance from "./BOTKEEPERSERVICE/BotInstance";
import { waitPromiseRandomizeTime } from "./DATASERVICE/utility";
import { Business, SERVICE } from "./types";
import { Settings } from "./types";
import IgBotV20201004 from "./BOTKEEPERSERVICE/BotBehaviors/IgBotV20201004";

export default class BOTKEEPERSERVICE extends SERVICE {
  // we use an array and not a dictionairy because
  botInstances: { [id: string]: BotInstance } = {};

  async run() {
    if (this.STARTUPPERFORMER.flag == "PAPI") return;

    //console.log("BOTKEEPERSERVICE startup...");

    // GET DATA FROM ALL BUSINESSES AND CREATE INSTAGRAM BOT INSTANCES FOR EACH;
    let businesses = <Business[]>(
      await this.STARTUPPERFORMER.dataService.getRecords("businesses")
    );
    businesses.forEach((business) => {
      this.registerNewBot(business);
    });

    // let bots all start one after another:
    let businessIDs = Object.keys(this.botInstances);
    businessIDs.forEach(async (key, i) => {
      let bi = this.botInstances[key];
      await bi.run();
      if (i != businessIDs.length - 1)
        await waitPromiseRandomizeTime(1000, 2000);
      // wait some time so that instagram does not realize all bots are run from
    });

    //console.log("BOTKEEPERSERVICE startup successful!");
  }

  async updateBotBusiness(businessID: string) {
    try {
      const botInstance = this.botInstances[businessID];
      if (!botInstance)
        throw new Error(
          `Error: no registered botInstance with business id ${businessID} in botkeeper dictionary.`
        );
      const updatedBusiness = await this.STARTUPPERFORMER.dataService.getBusinessByID(
        businessID
      );
      if (updatedBusiness) {
        botInstance.business = updatedBusiness;
      } else {
        throw new Error(
          `Error: business with ID ${businessID} cant be found in database, even though it has been indicated that its botInstance needs to update it.`
        );
      }
      botInstance.business = updatedBusiness;
    } catch (ex) {
      console.error(ex);
    }
  }

  registerNewBot(business: Business) {
    this.botInstances[business.id] = new BotInstance(this, business);
  }

  async registerNewBotByID(businessID: string) {
    try {
      const newBusiness = await this.STARTUPPERFORMER.dataService.getBusinessByID(
        businessID
      );
      if (newBusiness) {
        this.registerNewBot(newBusiness);
      } else {
        throw new Error(
          `Error: business with ID ${businessID} cant be found in database, even though it has been indicated that it was just created and a botinstance hence should be created for it.`
        );
      }
    } catch (ex) {
      console.error(ex);
    }
  }

  async deleteBot(businessID: string) {
    try {
      const botInstance = this.botInstances[businessID];
      if (!botInstance)
        throw new Error(
          `botInstance with id ${businessID} is not registered, but the deleteBot() function is called on the botkeeper with this id.`
        );
      else {
        await botInstance.die();
        delete this.botInstances[businessID];
      }
    } catch (ex) {
      console.error(ex);
    }
  }

  getBotBehavoir(bi: BotInstance): BotBehavior {
    // ______________________ Add support for custom botBehavior
    let bb: BotBehavior = new IgBotV20201004(bi);
    // append event listenors
    bi.on("StoryMention", (eventData) => {
      bb.onStoryMention(eventData);
    });
    bi.on("PostMention", (eventData) => {
      bb.onPostMention(eventData);
    });
    bi.on("DirectMessage", (eventData) => {
      bb.onDirectMessage(eventData);
    });
    bi.on("Subscribe", (eventData) => {
      bb.onSubscribe(eventData);
    });
    bi.on("PostLike", (eventData) => {
      bb.onPostLike(eventData);
    });
    return bb;
  }
}

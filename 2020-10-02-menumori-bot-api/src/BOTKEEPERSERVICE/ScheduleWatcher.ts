import BOTKEEPERSERVICE from "../BOTKEEPERSERVICE";
import moment from "moment";
import { BotOnlineStatus, BotInstanceStatus } from "../types";
import BotInstance from "./BotInstance";
import {
  randomizeNumber,
  waitPromise,
  waitPromiseRandomizeTime,
} from "../DATASERVICE/utility";

const INTERVALTORUNTIMECHECKS = 60 * 1000;
export default class ScheduleWatcher {
  botKeeperService: BOTKEEPERSERVICE;

  constructor(botKeeperService: BOTKEEPERSERVICE) {
    this.botKeeperService = botKeeperService;
  }

  async run() {
    console.log("ScheduleWatcher is now running");
    // run checks if botInstance should be turned offline (foreGroundState offline) every 1 minute

    setInterval(() => {
      this.runEveryMinute();
    }, INTERVALTORUNTIMECHECKS);
  }

  async runEveryMinute() {
    let { hours, minutes, timeString } = this.getHoursAndMinutesOfDay();
    let allBotInstances = this.botKeeperService.getAllBotInstances();

    // for all businesses: check if online_time_start or online_time_end is now and act appropiatly by sending Online/Offline Foreground States to instagram (with some minutes random delay though...)
    allBotInstances.forEach((botInstance) => {
      try {
        let {
          online_time_start,
          online_time_end,
        } = botInstance.business.business_settings.ig_settings.ig_behavior_settings;
        online_time_end = online_time_end.substring(0, 5);
        online_time_start = online_time_start.substring(0, 5);
        //console.log(`${botInstance.business.slugname} ${online_time_start} - ${online_time_end}`);

        // compare times to time right now:
        if (botInstance.botInstanceStatus == BotInstanceStatus.ACTIVE) {
          if (online_time_end == timeString)
            this.executeChangeInstagramForegroundStateWithRandomDelay(
              botInstance,
              BotOnlineStatus.OFFLINE
            );
          if (online_time_start == timeString)
            this.executeChangeInstagramForegroundStateWithRandomDelay(
              botInstance,
              BotOnlineStatus.ONLINE
            );
        }
      } catch (err) {
        this.botKeeperService.STARTUPPERFORMER.dataService.handleException(err);
      }
    });
  }

  /**
   * calls the changeInstagramForegroundState() of the given botInstance with argument newBotOnlineStatus after delay of some minutes, to prevent Instagram from seeing a too botlike pattern in online/offline times
   * @param botInstance reference to botInstance of BotkeeperService
   * @param newBotOnlineStatus ONLINE or OFFLINE
   */
  async executeChangeInstagramForegroundStateWithRandomDelay(
    botInstance: BotInstance,
    newBotOnlineStatus: BotOnlineStatus
  ) {
    let delayMin: number = 1; // min. delay in minutes
    let delayMax: number = 3; // max. delay in in minutes
    let randomizedTime = randomizeNumber(
      delayMin * 60 * 1000,
      delayMax * 60 * 1000
    );
    await waitPromise(randomizedTime);
    botInstance.changeInstagramForegroundStateAndConnectDisconnectRealtime(
      newBotOnlineStatus
    );
    /*
    console.log(
      `${botInstance.business.slugname} is going to be set to ${newBotOnlineStatus}. Wait ${randomizedTime} minutes...`
    );
    */
    /*
    console.log(
      `done with waiting. Turn ${botInstance.business.slugname} to ${newBotOnlineStatus}`
    );
    */
  }

  getHoursAndMinutesOfDay() {
    let date = new Date();
    let timeString = moment(date).format("HH:mm");
    return { hours: date.getHours(), minutes: date.getMinutes(), timeString };
  }
}

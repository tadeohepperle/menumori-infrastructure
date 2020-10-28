import moment from "moment";
import DATASERVICE from "../DATASERVICE";

/**
 *
 * @param message
 * @param level importance of error, 0: just a log, 1: minor issue, function not used as intended, 2: concerning, 3: breaks the program, 4: should force program to exit to prevent additional damage
 */

export default class ERRORHANDLER {
  dataService: DATASERVICE;
  constructor(dataService: DATASERVICE) {
    this.dataService = dataService;
  }

  async handleException(error: Error | any, level: number = 1) {
    let timestamp = moment().format("YYYY-MM-DD HH:mm:ss");
    let logObject = {
      message: error?.message,
      stack: error?.stack,
      timestamp: timestamp,
    };

    await this.dataService.postRecord("errorlogs", logObject);

    console.error(error);
    if (level === 4) {
      process.exit(0);
    }
  }
}

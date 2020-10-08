/*script to startup all subservices. Those are:

- APIINSERVICE (incoming request, to trigger certain behavior of the bots)
- DATASERVICE (communicates with the strapi.io backend and in this way with the data base to retrieve and manipulate data)
- BOTKEEPERSERVICE (starts bots, keeps track of the bots running, can assign behavior to them, etc.)

*/

import { Settings } from "./types";
import APIINSERVICE from "./APIINSERVICE";
import BOTKEEPERSERVICE from "./BOTKEEPERSERVICE";
import DATASERVICE from "./DATASERVICE";
import { readJsonSettingsFile } from "./DATASERVICE/settingsManager";

export default class STARTUPPERFORMER {
  SETTINGS: Settings;
  dataService: DATASERVICE;
  apiInService: APIINSERVICE;
  botKeeperService: BOTKEEPERSERVICE;

  constructor() {
    this.SETTINGS = readJsonSettingsFile();
    this.dataService = new DATASERVICE(this);
    this.botKeeperService = new BOTKEEPERSERVICE(this);
    this.apiInService = new APIINSERVICE(this);
  }

  async run() {
    console.log(this.SETTINGS);
    await this.dataService.run();
    await this.botKeeperService.run();
    await this.apiInService.run();
  }
}

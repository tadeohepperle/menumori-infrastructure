import fs from "fs";
import { appendToJSONFile } from "./fileworks";
import { IgApiClientRealtime } from "instagram_mqtt";

export function logString(str: String): void {
  fs.appendFileSync("./logger.txt", str + "\n");
}

const LOGFOLDER = "./logs/";
const ALLLOGSFILE = "logger.txt";

let logQueue: Array<{ str: string; json: any }> = [];
let inAction = false;

export async function advancedLogging(str: string, json?: any) {
  const LOGSTRINGFILEPATH = logQueue.push({ str, json });
  if (!inAction) {
    inAction = true;
    while (logQueue.length > 0) {
      let time = new Date();
      let timestring = time.toLocaleDateString("de-DE", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      });
      let element = logQueue.shift();
      if (element && element.str) {
        let appendString = timestring + " | " + element.str + "\n";
        await fs.promises.appendFile(LOGFOLDER + ALLLOGSFILE, appendString, {
          flag: "a+",
        });
        /*
        await fs.promises.appendFile(
          LOGFOLDER + `logs.txt`,
          timestring + " | " + element.str + "\n",
          {
            flag: "a+",
          }
        );
        */
        if (element.json) {
          await appendToJSONFile(LOGFOLDER + `logs.json`, {
            logtimeNextEntry: timestring,
          });
          await appendToJSONFile(LOGFOLDER + `logs.json`, element.json);
        }
      }
    }
    inAction = false;
  }
}

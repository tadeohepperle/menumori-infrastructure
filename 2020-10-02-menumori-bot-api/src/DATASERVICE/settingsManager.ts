import { Settings } from "./../types";
import fs from "fs";

export const readJsonSettingsFile = () => {
  try {
    // MENUMORISETTINGS.json is in folder above the menumori-bot-api-folder
    let file = fs.readFileSync("./../MENUMORISETTINGS.json", "utf-8");
    return <Settings>JSON.parse(file);
  } catch (ex) {
    console.error(ex);

    return <Settings>{};
  }
};

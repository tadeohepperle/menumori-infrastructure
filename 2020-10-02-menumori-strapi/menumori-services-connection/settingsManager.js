const fs = require("fs");

module.exports.readJsonSettingsFile = () => {
  try {
    // MENUMORISETTINGS.json is in folder above the menumori-bot-api-folder
    let file = fs.readFileSync("./../MENUMORISETTINGS.json", "utf-8");
    return JSON.parse(file);
  } catch (ex) {
    console.error(ex);
    return {};
  }
};

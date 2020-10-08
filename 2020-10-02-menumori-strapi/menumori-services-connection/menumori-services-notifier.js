const { readJsonSettingsFile } = require("./settingsManager");
const axios = require("axios");
const SETTINGS = readJsonSettingsFile();

module.exports = {
  async businessChanged(id, flag) {
    console.log("BUSINESS CHANGED:");
    console.log(id, flag);
    axios.post(
      `${SETTINGS.BOTAPIURL}/business-changed`,
      { id, flag },
      {
        headers: {
          authorization: SETTINGS.INTERNALSERVICESSECRET,
        },
      }
    );
    // we dont check or care if request was successful, it is just a message the api listens to, to update its bot instances
  },
};

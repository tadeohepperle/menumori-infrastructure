const axios = require("axios");
const FormData = require("form-data");
const { objectToQueryString } = require("./utility");

class DATASERVICE {
  SETTINGS = {
    BOTAPIPORT: "2000",
    PAPIPORT: "1338",
    BOTAPIURL: "http://localhost:2000",
    PAPIURL: "http://localhost:1338",
    STRAPIURL: "http://localhost:1337",
    STRAPIUSERNAME: "menumori-bot-api",
    STRAPIPASSWORD: "dh2387?DSH217%§",
    INTERNALSERVICESSECRET: "89732eqBUAD(/ASDKMIASIO§",
    USEPROXY: true,
    PROXYHOST: "127.0.0.1",
    PROXYPORT: "9050",
    CONNECTTOINSTAGRAM: true,
    FRONTENDURL: "www.menumori.de",
  };

  // for internal service:
  jwt =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmN2E0OGY3YmI0YmIyMDYwNDJlM2IzNSIsImlhdCI6MTYwMjY3NjI3OSwiZXhwIjoxODYxODc2Mjc5fQ.NN63gehaIljnCcvnKLoSQs23MA1TMYEyyf4Vcahq4EQ";

  constructAuthenticationConfig() {
    return {
      headers: {
        Authorization: `Bearer ${this.jwt}`,
      },
    };
  }

  async postRecordAsFormDataWithMedia(
    collectionName,
    normalFieldsOfRecord,
    // the values should be streams:
    mediaPartOfRecord
  ) {
    try {
      let fd = new FormData();
      // normal fields:
      fd.append("data", JSON.stringify(normalFieldsOfRecord));
      // media fields:
      Object.keys(mediaPartOfRecord).forEach((key) => {
        fd.append(
          `files.${key}`,
          mediaPartOfRecord[key].stream,
          mediaPartOfRecord[key].filename
        );
      });

      // @ts-ignore
      let formDataBoundry = fd._boundary;
      if (!formDataBoundry)
        throw Error(
          `formDataboundry not defined, cant post (+ upload media) record ${normalFieldsOfRecord} to ${collectionName}`
        );

      let result = await axios({
        url: `${this.SETTINGS.STRAPIURL}/${collectionName}/`,
        method: "post",
        data: fd,
        withCredentials: true,
        headers: {
          // formdataboundary is needed for some reason, otherwise it is not accepted by the strapi backend:
          "content-type": `multipart/form-data; boundary=${formDataBoundry}`,
          Authorization: `Bearer ${this.jwt}`,
        },
      });

      if (result.data) return result.data;
      else
        throw new Error(
          `tried to post/upload record ${JSON.stringify(
            normalFieldsOfRecord
          )} to /${collectionName} as formData with media ${Object.keys(
            mediaPartOfRecord
          ).map(
            (key) => `${key} : ${mediaPartOfRecord[key].filename}`
          )} but didt get inserted record data back from strapi.`
        );
    } catch (ex) {
      console.error(ex);
    }
    return null;
  }

  async getDataStreamFromURL(url) {
    try {
      let response = await axios({
        url,
        method: "GET",
        responseType: "stream",
      });

      if (response.status == 200 && response.data) {
        return response.data;
      }
    } catch (ex) {
      console.error(ex);
    }
  }

  async getRecords(collectionName, queryParameters) {
    try {
      let res = await axios.get(
        `${this.SETTINGS.STRAPIURL}/${collectionName}${objectToQueryString(
          queryParameters
        )}`,
        this.constructAuthenticationConfig()
      );
      if (res.status == 200 && typeof res.data === "object") {
        return res.data;
      } else throw new Error(`Could not get ${collectionName} from strapi.`);
    } catch (err) {
      console.error(err);
      return [];
    }
  }

  async deleteRecordByID(collectionName, recordID) {
    try {
      let result = await axios.delete(
        `${this.SETTINGS.STRAPIURL}/${collectionName}/${recordID}`,
        this.constructAuthenticationConfig()
      );
      if (result.data) return result.data;
      else
        throw new Error(
          `tried to delete record with id ${recordID} from /${collectionName} but was not succcessful.`
        );
    } catch (ex) {
      console.error(ex);
    }
    return null;
  }

  async postRecord(collectionName, record) {
    try {
      let result = await axios.post(
        `${this.SETTINGS.STRAPIURL}/${collectionName}/`,
        record,
        this.constructAuthenticationConfig()
      );
      if (result.data) return result.data;
      else
        throw new Error(
          `tried to post object ${JSON.stringify(
            record
          )} to /${collectionName} but didt get inserted record data back from strapi.`
        );
    } catch (ex) {
      console.error(ex);
    }
    return null;
  }
}

module.exports = DATASERVICE;

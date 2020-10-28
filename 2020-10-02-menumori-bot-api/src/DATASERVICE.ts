import { Business, SERVICE } from "./types";
import axios from "axios";
import { objectToQueryString } from "./DATASERVICE/utility";
import FormData from "form-data";
import STARTUPPERFORMER from "./STARTUPPERFORMER";
import ERRORHANDLER from "./DATASERVICE/errorHandler";

export default class DATASERVICE extends SERVICE {
  jwt: any;
  _errorHandler: ERRORHANDLER;

  constructor(startupperformer: STARTUPPERFORMER) {
    super(startupperformer);
    this._errorHandler = new ERRORHANDLER(this);
  }

  async handleException(error: any, level: number = 1): Promise<void> {
    await this._errorHandler.handleException(error, level);
  }

  async run() {
    //console.log("DATASERVICE startup...");
    await this.getAndStoreCredentialsFromStrapi();
    //console.log("DATASERVICE startup successful!");
  }

  async getAndStoreCredentialsFromStrapi() {
    try {
      let res = await axios.post(`${this.SETTINGS.STRAPIURL}/auth/local`, {
        identifier: this.SETTINGS.STRAPIUSERNAME,
        password: this.SETTINGS.STRAPIPASSWORD,
      });
      if (res.status == 200) {
        this.jwt = res.data.jwt;
        return;
      } else throw new Error("Cant get Authenticated by Strapi");
    } catch (ex) {
      this.handleException(ex, 4);
    }
  }

  constructAuthenticationConfig() {
    return {
      headers: {
        Authorization: `Bearer ${this.jwt}`,
      },
    };
  }

  async getBusinessByID(businessID: string): Promise<Business | null> {
    return await this.getRecordByID("businesses", businessID);
  }

  async getBusinesses(queryParameters?: object): Promise<Business[]> {
    return (await this.getRecords("businesses", queryParameters)) as Business[];
  }

  async getRecords(
    collectionName: string,
    queryParameters?: object
  ): Promise<object[]> {
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
      this.handleException(err, 2);
      return [];
    }
  }

  async getRecordByID(collectionName: string, recordID: string): Promise<any> {
    try {
      let res = await axios.get(
        `${this.SETTINGS.STRAPIURL}/${collectionName}/${recordID}`,
        this.constructAuthenticationConfig()
      );
      if (res.status == 200 && typeof res.data === "object") {
        return res.data;
      } else
        throw new Error(
          `Could not get record from ${collectionName} with id ${recordID} from strapi.`
        );
    } catch (err) {
      this.handleException(err, 2);
      return null;
    }
  }

  async getBusinessBySlugname(slugname: string): Promise<Business | null> {
    try {
      let business = (
        await this.getRecords("businesses", {
          slugname,
          _limit: 1,
        })
      )[0] as Business;
      return business ? business : null;
    } catch (ex) {
      this.handleException(ex, 2);
      return null;
    }
  }

  async postRecord(
    collectionName: string,
    record: object
  ): Promise<object | null> {
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
      this.handleException(ex, 2);
      // this is a bit tricky - if we dont exit it may lead to an inifnite Loop:
      if (collectionName === "errorlogs") {
        process.exit(0);
      }
    }
    return null;
  }

  async postRecordAsFormDataWithMedia(
    collectionName: string,
    normalFieldsOfRecord: object,
    // the values should be streams:
    mediaPartOfRecord: { [id: string]: { stream: any; filename: string } }
  ): Promise<object | null> {
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
      this.handleException(ex, 2);
    }
    return null;
  }

  async getDataStreamFromURL(url: string) {
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
      this.handleException(ex, 2);
    }
  }

  async updateRecord(collectionName: string, record: any) {
    try {
      if (!record.id)
        throw new Error(
          `you're trying to update the record ${JSON.stringify(
            record
          )} in collection /${collectionName}. record must have a field id, otherwise update cannot be perfermed.`
        );
      let result = await axios.put(
        `${this.SETTINGS.STRAPIURL}/${collectionName}/${record.id}`,
        record,
        this.constructAuthenticationConfig()
      );
      if (result.data) return result.data;
      else
        throw new Error(
          `tried to update object ${JSON.stringify(
            record
          )} in collection /${collectionName} but didt get updated record data back from strapi.`
        );
    } catch (err) {
      this.handleException(err, 2);
    }
  }

  async updateBusinessData(business: Business) {
    // update live for all websockets connected and associated with the business:

    // ...

    // update in database:
    try {
      await axios.put(
        `${this.SETTINGS.STRAPIURL}/business-data/${business.business_data.id}`,
        business.business_data,
        this.constructAuthenticationConfig()
      );
    } catch (err) {
      this.handleException(err, 2);
    }
  }
}

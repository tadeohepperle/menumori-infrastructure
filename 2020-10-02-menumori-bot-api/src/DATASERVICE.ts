import { Business, SERVICE } from "./types";
import axios from "axios";
import { objectToQueryString } from "./DATASERVICE/utility";

export default class DATASERVICE extends SERVICE {
  jwt: any;

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
    } catch (err) {
      console.error(err);
    }
  }

  constructAuthenticationConfig() {
    return {
      headers: {
        Authorization: "Bearer " + this.jwt,
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
      console.error(err);
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
      console.error(err);
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
      console.error(ex);
    }
    return null;
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
      console.error(err);
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
      console.error(err);
    }
  }
}

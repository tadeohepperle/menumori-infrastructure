/////////////////////////////////////////////////////////////////////
//
//
/////////////////////////////////////////////////////////////////////
import qs from "qs";
import axios from "axios";
import {
  setBusinessSettings,
  setBusinessSettingsAndBusinessData,
} from "../redux/actions";

// DEFINE ALL THE CONNECTION VARIABLES:
export const IAPIURL = "http://localhost:1337"; // internal API URL = Strapi url, connects directly to the database, all routes are at least jwt protected even for get requests.
export const PAPIURL = "http://localhost:1338"; // public API URL = menumori-bot-api / indexpapi, routes can be accessed by anywhere

/////////////////////////////////////////////////////////////////////
//
//
/////////////////////////////////////////////////////////////////////

export async function getURLOfRatingPage(slugname) {
  // transforms the slugname into the link to google ratings, which is then forwarded to thatz link.
  // executed by pages/r/[slugname].js
  // ask papi:
  try {
    const res = await axios.get(`${PAPIURL}/ratingurl/${slugname}`);
    if (res?.data?.url) {
      return res.data.url;
    } else return null;
  } catch (ex) {
    console.error(ex);
    return null;
  }
}

export async function getPublicBusinessData(slugname) {
  try {
    const res = await axios.get(`${PAPIURL}/businessdata/${slugname}`);
    if (res?.data) {
      let business = res.data;
      if (
        business &&
        business.slugname &&
        business.city &&
        business.title &&
        business.house_number &&
        business.zip_code &&
        business.username &&
        business.street_name
      )
        return business;
      else return null;
    } else return null;
  } catch (ex) {
    console.error(ex);
    return null;
  }
}

export async function getAllPublicBusinessData() {
  try {
    const res = await axios.get(`${PAPIURL}/allbusinessdata`);
    if (res?.data && res?.data?.length > 0) {
      return res.data;
    } else return [];
  } catch (ex) {
    console.error(ex);
    return [];
  }
}

export async function sendLoginRequest(identifier, password) {
  try {
    let res = await axios.post(`${IAPIURL}/auth/local`, {
      identifier,
      password,
    });
    return res.data; // {jwt, user:{username, email, businesses: []}}
  } catch (ex) {
    console.error(ex);
    return null;
  }
}

export async function verifyJWT(jwt) {
  // jwt can just be verified by sending a count request to business-category. This endpoint can only be accessed by authenticated users.
  try {
    let res = await axios({
      url: `${IAPIURL}/business-categories/count`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    if (res.status === 200) return true;
    else return false;
  } catch (ex) {
    //console.error(ex);
    return false;
  }
}
/**
 * returns an array of businesses, each just {id, title, slguname}
 * @param {string[]} ids
 */
export async function getShallowBusinessDataFromIds(ids) {
  try {
    let res = await axios.post(`${PAPIURL}/businessesbyids`, {
      ids,
    });
    return res.data; // {jwt, user:{username, email, businesses: []}}
  } catch (ex) {
    console.error(ex);
    return null;
  }
}

export async function getBusinessSettingsAndBusinessData(
  shallowBusiness,
  jwt,
  dispatch
) {
  try {
    console.log("going to fetch for", shallowBusiness);

    let businessDataProm = axios({
      url: `${IAPIURL}/business-data/${shallowBusiness.businessDataID}`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    let businessSettingsProm = axios({
      url: `${IAPIURL}/business-settings/${shallowBusiness.businessSettingsID}`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    const [
      { data: businessData },
      { data: businessSettings },
    ] = await Promise.all([businessDataProm, businessSettingsProm]);

    console.log("businessSettings", businessSettings);

    dispatch(
      setBusinessSettingsAndBusinessData(businessSettings, businessData)
    );
    return true;
  } catch (ex) {
    console.error(ex);
    return false;
  }
}

export async function updateBusinessSettings(
  businessSettingsID,
  objectForPutRequestBody,
  jwt,
  dispatch
) {
  try {
    let response = await axios({
      url: `${IAPIURL}/business-settings/${businessSettingsID}`,
      method: "PUT",
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
      data: objectForPutRequestBody,
    });
    let newBusinessData = response.data;
    /*
    console.log("got response from update:");
    console.log(newBusinessData);
    */
    dispatch(setBusinessSettings(newBusinessData));

    return true;
  } catch (ex) {
    console.error(ex);
    return false;
  }
}

export async function getBusinessStats(businessID, query, jwt) {
  try {
    let url = `${PAPIURL}/businessstats/${businessID}?${qs.stringify(query)}`;
    const response = await axios({
      url,
      method: "GET",
      headers: {
        Authorization: `${jwt}`,
      },
    });
    if (response.status == 200) return response.data;
  } catch (ex) {
    console.error(ex);
    return false;
  }
}

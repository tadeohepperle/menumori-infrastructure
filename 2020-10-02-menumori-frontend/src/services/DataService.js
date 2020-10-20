/////////////////////////////////////////////////////////////////////
//
//
/////////////////////////////////////////////////////////////////////

import axios from "axios";

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

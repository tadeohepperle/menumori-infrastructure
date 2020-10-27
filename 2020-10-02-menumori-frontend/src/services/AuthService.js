import { Cookies } from "react-cookie";
import {
  getShallowBusinessDataFromIds,
  sendLoginRequest,
  verifyJWT,
} from "./DataService";
import Router from "next/router";
import { isServer, getCookieFromString } from "./utility";
import {
  setShallowOwnedBusinessesData,
  setUserAndJWT,
  setStoreByLogout,
} from "../redux/actions";
const cookies = new Cookies();

export const JWTCOOKIENAME = "menumori-jwt";
export const USERDATACOOKIENAME = "menumori-user";

export function getJWT() {
  let jwt = cookies.get(JWTCOOKIENAME);
  return jwt;
}

/**
 * Function that can be used in getInitialProps to protect a page from being entered by unauthorized users
 *
 * @param {any} ctx
 * @param {string} badRequestLocation
 */
export async function handleAuth(
  ctx,
  badRequestLocation = "/",
  goodRequestLocation = null
) {
  let jwt = null;

  // EXTRACT JWT FROM COOKIES (CS) OR REQUEST HEADERS (SS)
  if (ctx.req) {
    // Server Side
    let cci = ctx.req.headers.cookie; // cookie
    if (cci) {
      let a = cci.search(`${JWTCOOKIENAME}=`);
      if (a >= 0) {
        cci = cci.substr(a + JWTCOOKIENAME.length + 1, cci.length);
        let z = cci.search(";");
        if (z >= 0) {
          cci = cci.substr(0, z);
        }
      } else {
        cci = null;
      }
    }
    jwt = cci;
  } else {
    // we dont have request info aka Client Side
    jwt = cookies.get(JWTCOOKIENAME);
  }

  // VERIFY THE TOKEN:
  let verified = await verifyJWT(jwt);

  // SEND USER TO DIFFERENT PAGE/DONT LET THEM ACCESS THE PROTECTED PAGE
  if (!verified && badRequestLocation) {
    if (ctx.res) {
      ctx.res.writeHead(302, {
        Location: badRequestLocation,
      });
      ctx.res.end();
    } else {
      await Router.push(badRequestLocation);
    }
  } else if (verified && goodRequestLocation) {
    if (ctx.res) {
      ctx.res.writeHead(302, {
        Location: goodRequestLocation,
      });
      ctx.res.end();
    } else {
      await Router.push(goodRequestLocation);
    }
  } else {
    // just do nothing
  }
}

// can be used in getinitialprops
export async function setJWTAndUserAccordingToCookies(ctx, dispatch) {
  // check if on client or on server:

  let jwt = "";
  let user = null;
  if (isServer() && ctx.req.headers.cookie) {
    let cci = ctx.req.headers.cookie;

    try {
      user = JSON.parse(getCookieFromString(cci, USERDATACOOKIENAME));
    } catch (ex) {}
    jwt = getCookieFromString(cci, JWTCOOKIENAME);
  } else {
    try {
      user = json.parse(cookies.get(USERDATACOOKIENAME));
    } catch (ex) {}

    jwt = cookies.get(JWTCOOKIENAME);
  }

  //dispatch(setUserAndJWT(user, jwt));
}

export async function login(
  username,
  password,
  dispatch /* from useDispatch()  */
) {
  console.log(`logging in with username: ${username}, password: ${password}`);
  let data = await sendLoginRequest(username, password);
  if (data && data.jwt && data.user) {
    // login successful:
    let cookieExpirationDate = new Date();
    cookieExpirationDate.setFullYear(cookieExpirationDate.getFullYear() + 1);
    // set cookies
    cookies.set(USERDATACOOKIENAME, JSON.stringify(data.user), {
      expires: cookieExpirationDate,
    });
    cookies.set(JWTCOOKIENAME, data.jwt.toString(), {
      expires: cookieExpirationDate,
    });
    dispatch(setUserAndJWT(data.user, data.jwt));

    if (data?.user?.businesses && data?.user?.businesses.map) {
      // fetch shallow businessdata, so that businesses can be selected in dashboard:
      let ids = data.user.businesses.map((b) => b.id);
      let shallowData = await getShallowBusinessDataFromIds(ids);
      //console.log("shallowdata", shallowData);
      dispatch(setShallowOwnedBusinessesData(shallowData));
    }

    return true;
  }
  // login failed:
  else return false;
}

export async function logout(dispatch, router) {
  console.log("logging out");
  cookies.remove(USERDATACOOKIENAME);
  cookies.remove(JWTCOOKIENAME);
  await router.push("/");
  dispatch(setStoreByLogout());
  //dispatch(setShallowOwnedBusinessesData([]));
  return true;
}

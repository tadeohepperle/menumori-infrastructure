import { Cookies } from "react-cookie";
import { verifyJWT } from "./DataService";
import Router from "next/router";
const cookies = new Cookies();

export const JWTCOOKIENAME = "menumori-jwt";
export const USERDATACOOKIENAME = "menumori-jwt";

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
    console.log("goodrequest");
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

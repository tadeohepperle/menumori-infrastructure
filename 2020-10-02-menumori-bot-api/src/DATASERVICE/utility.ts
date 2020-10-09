import { Business, Settings } from "../types";

export function objectToQueryString(queryObject: any) {
  if (typeof queryObject != "object") return "";
  let queryString = Object.keys(queryObject)
    .map((key) => {
      if (typeof key === "string") {
        return (
          encodeURIComponent(key) +
          "=" +
          encodeURIComponent(queryObject[key].toString())
        );
      }
    })
    .join("&");

  return queryString ? "?" + queryString : "";
}

export function randomizeNumber(ug: number, og: number) {
  return Math.round(Math.random() * (og - ug) + ug);
}

export async function waitPromise(t: number): Promise<void> {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res();
    }, t);
  });
}

export async function waitPromiseRandomizeTime(ug: number, og: number) {
  await waitPromise(randomizeNumber(ug, og));
}

export function getUserID(session: any): number {
  let cookies = JSON.parse(session.cookies).cookies;
  let ds_user_id = cookies.filter((el: any) => el.key == "ds_user_id")[0]
    ?.value;
  return ds_user_id;
}

export function pythonStringFormat(text: string, argsObject: any) {
  Object.keys(argsObject).forEach((key) => {
    text = text.split("{" + key + "}").join(argsObject[key]);
  });
  return text;
}

export function createGoogleRatingLink(SETTINGS: Settings, business: Business) {
  return `${SETTINGS.FRONTENDURL}/r/${business.short_id}`;
}

export function createAGBLink(SETTINGS: Settings, business: Business) {
  return `${SETTINGS.FRONTENDURL}/a/${business.short_id}`;
}

export function addHoursToDate(date: Date, h: number) {
  date.setTime(date.getTime() + h * 60 * 60 * 1000);
  return date;
}

export function isComplyText(textReceived: string, correctComplyText: string) {
  textReceived = textReceived.trim();
  correctComplyText = correctComplyText.trim();

  // casing does not matter:
  if (textReceived.toLowerCase() == correctComplyText.toLowerCase())
    return true;
  if (textReceived.toLowerCase() == `"${correctComplyText}"`.toLowerCase())
    return true;
  // für die Leute die das "ja" ganz genau nehmen.
  return false;
}

export function getVorname(full_name: string) {
  return full_name.split(" ")[0].trim();
}

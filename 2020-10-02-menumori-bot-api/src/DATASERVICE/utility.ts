import Hashids from "hashids";
import { Business, Settings } from "../types";
import { Readable } from "stream";
import { promises } from "fs";

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

export function createRatingLink(SETTINGS: Settings, business: Business) {
  return `${SETTINGS.FRONTENDURL}/r/${business.slugname}`;
}

export function createAGBLink(SETTINGS: Settings, business: Business) {
  return `${SETTINGS.FRONTENDURL}/a/${business.slugname}`;
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

export function generateStreakID(mentioningIgActionId: string) {
  let hashids = new Hashids(
    "die Prangerle Solutions e.K. eghört Tadeo Hepperle und Tobias Prangel",
    8,
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  );
  let hex = Buffer.from(mentioningIgActionId).toString("hex");
  let hash = hashids.encodeHex(hex);
  return hash.substring(0, 8);
}

export function formatDateStandardWay(date: Date | string) {
  let d;
  if (typeof date === "string") d = new Date(date);
  else d = date;

  d = new Date(date);
  let month = "" + (d.getMonth() + 1);
  let day = "" + d.getDate();
  let year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}

export function formatDateGerman(date: Date): string {
  return (
    date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear()
  );
}

export function bufferToReadableStream(buffer: Buffer) {
  // important for pushing generated ticket image buffer to strapi
  // from https://stackoverflow.com/questions/13230487/converting-a-buffer-into-a-readablestream-in-node-js
  return new Readable({
    read() {
      this.push(buffer);
      this.push(null);
    },
  });
}

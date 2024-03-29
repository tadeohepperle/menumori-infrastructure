import moment from "moment";

export function cutEndOfString(string, maxlen) {
  return string.length > maxlen
    ? string.substring(0, maxlen - 3) + "..."
    : string;
}

export async function waitPromise(seconds) {
  await new Promise((res, rej) => {
    setTimeout(() => {
      res();
    }, seconds * 1000);
  });
}

export function isServer() {
  return typeof window === "undefined";
}

export function getCookieFromString(cookieString, name) {
  const value = `; ${cookieString}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

export const DASHBOARDNAVITEMS = [
  { title: "Aktuelle Statistik", slugname: "section_statistik" },
  { title: "Angaben zum Geschäft", slugname: "section_allgemein" },
  { title: "Verhalten auf Instagram", slugname: "section_ig_behavior" },
  { title: "Instagram Login Daten", slugname: "section_ig_login" },
];

export function roundDecimal(number, digitsBehindComma = 2, CommaSymbol = ",") {
  let pot = 10 ** digitsBehindComma;
  return (Math.floor(number * pot) / pot).toString().replace(".", CommaSymbol);
}

export function getDateStringForStartOfMonth() {
  let date = new Date();
  return moment(date).format("YYYY-MM") + "-01";
}

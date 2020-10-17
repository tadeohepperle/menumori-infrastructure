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

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

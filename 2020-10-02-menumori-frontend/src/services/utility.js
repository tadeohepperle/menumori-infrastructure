export function cutEndOfString(string, maxlen) {
  return string.length > maxlen
    ? string.substring(0, maxlen - 3) + "..."
    : string;
}

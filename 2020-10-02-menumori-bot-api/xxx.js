var Hashids = require("hashids");
const { hash } = require("jimp");
/*
let hashids = new Hashids(
  "this is my stupid salt",
  8,
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
);
let id = 1;
let i = hashids.encode("77sad2");
console.log(i);

*/

function generateStreakID(mentioningIgActionId) {
  let hashids = new Hashids(
    "this is my stupid salt",
    8,
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  );
  let hex = Buffer.from(mentioningIgActionId).toString("hex");
  let hash = hashids.encodeHex(hex);
  return hash.substring(0, 8);
}

console.log(generateStreakID("2su28sa2"));

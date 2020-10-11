var Hashids = require("hashids");

let hashids = new Hashids(
  "this is my stupid salt",
  8,
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
);
let id = 1;
let i = hashids.encode("77sad2");
console.log(i);

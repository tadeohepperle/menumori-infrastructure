const qs = require("qs");

console.log(
  qs.stringify({
    limitstorymentions: 23,
    startdate: "2020-08-23",
  })
);

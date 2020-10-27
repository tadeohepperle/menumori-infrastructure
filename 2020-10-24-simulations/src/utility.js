function formatDateStandardWay(date) {
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

const ACTION_TYPE = {
  StoryMention: "StoryMention",
  PostMention: "PostMention",
  DirectMessage: "DirectMessage",
  Subscribe: "Subscribe",
  PostLike: "PostLike",
  Unidentified: "Unidentified",
  SendPhoto: "SendPhoto",
};

const IG_ACTION_FLAG = {
  B_AGB: "B_AGB", // von business gesendet
  B_AGBCOMPLYREPLY: "B_AGBCOMPLYREPLY",
  B_TICKET: "B_TICKET",
  C_AGBCOMPLY: "C_AGBCOMPLY", // message von seite des nutzers
  C_STORYMENTION: "C_STORYMENTION", // can also be seen in ig.action.action_type
  C_POSTMENTION: "C_POSTMENTION", // can also be seen in ig.action.action_type
};

function objectToQueryString(queryObject) {
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

function randomChoice(choices) {
  var index = Math.floor(Math.random() * choices.length);
  return choices[index];
}

function addMinutesToDate(date, minutes) {
  return new Date(date.getTime() + minutes * 60000);
}

function addTime(date, time) {
  date.setTime(date.getTime() + time);
}

module.exports = {
  IG_ACTION_FLAG,
  ACTION_TYPE,
  addTime,
  addMinutesToDate,
  randomChoice,
  formatDateStandardWay,
  objectToQueryString,
};

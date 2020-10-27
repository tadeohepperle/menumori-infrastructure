const DATASERVICE = require("./DATASERVICE");
const { formatDateStandardWay } = require("./utility");

const dataService = new DATASERVICE();

function createIgAction(
  businessID,
  leadID,
  action_type,
  direction_b_to_l,
  media_url,
  content_text,
  thread_id,
  item_id,
  flag,
  streakshortid,
  businessSlugname,
  createdAt = undefined
) {
  return {
    businessID,
    leadID,
    action_type,
    direction_b_to_l,
    media_url,
    content_text,
    thread_id,
    item_id,
    flag,
    streakshortid,
    businessSlugname,
    createdAt,
  };
}

async function postIgAction({
  businessID,
  leadID,
  action_type,
  direction_b_to_l,
  media_url,
  content_text,
  thread_id,
  item_id,
  flag,
  streakshortid,
  businessSlugname,
  createdAt,
}) {
  let actionDate = createdAt ? createdAt : new Date();

  // create the record object with all normal fields:
  let ig_actionPrototype = {
    business: businessID,
    lead: leadID,
    direction_b_to_l,
    action_type,
    confirmed: true,
    content_text,
    thread_id,
    item_id,
    flag,
    streakshortid,
    businessSlugname,
    createdAt: actionDate,
    simulated: true,
  };

  // construct media object with field content_media (photo/video in stories) if needed:
  let mediaObject = {};
  if (media_url) {
    let filename = `${formatDateStandardWay(
      actionDate
    )}-${businessSlugname}.jpg`;
    let mediaStream = await dataService.getDataStreamFromURL(media_url);
    if (!mediaStream)
      throw new Error(
        `could not get DataStream from url ${media_url}. Cannot post/upload igAction ${JSON.stringify(
          ig_actionPrototype
        )}`
      );
    mediaObject.content_media = { stream: mediaStream, filename };
  }

  let record = await dataService.postRecordAsFormDataWithMedia(
    "ig-actions",
    ig_actionPrototype,
    mediaObject
  );

  return record;
}

function randomRange(a, b) {
  return Math.floor(Math.random() * (b - a) + a);
}
function pad(num, size) {
  num = num.toString();
  while (num.length < size) num = "0" + num;
  return num;
}

function generateABunchOfDateTimeStringsForPastYear(mentionsPerMonth) {
  let dateStringArr = [];
  let dateForMonth = new Date();

  for (let m = 0; m < 12; m++) {
    // foreach month:
    dateForMonth.setMonth(dateForMonth.getMonth() - 1);

    let year = dateForMonth.getFullYear();
    let month = pad(dateForMonth.getMonth() + 1, 2);
    for (let i = 0; i < mentionsPerMonth; i++) {
      let day = pad(randomRange(1, 29), 2); // min 1 max 28

      let hour = pad(randomRange(8, 22), 2);
      let minute = pad(randomRange(0, 60), 2);

      let dateString = `${year}-${month}-${day} ${hour}:${minute}`;
      dateStringArr.push(dateString);
    }
  }

  dateStringArr.sort();
  return dateStringArr;
}
module.exports = {
  createIgAction,
  postIgAction,
  generateABunchOfDateTimeStringsForPastYear,
};

/*

  let recordAsIGAction = record;
  if (recordAsIGAction && recordAsIGAction.id) {
    // add a streakshortid to igActions that mark the beginning of user seeking contact to the business via postmention or storymention
    if (
      recordAsIGAction.action_type == BotEmittingEvents.StoryMention ||
      recordAsIGAction.action_type == BotEmittingEvents.PostMention
    ) {
      if (recordAsIGAction.action_type == BotEmittingEvents.StoryMention)
        recordAsIGAction.flag = IgActionFlag.C_STORYMENTION;
      if (recordAsIGAction.action_type == BotEmittingEvents.PostMention)
        recordAsIGAction.flag = IgActionFlag.C_POSTMENTION;

      recordAsIGAction.streakshortid = generateStreakID(recordAsIGAction.id);
      recordAsIGAction = (await this.dataService.updateRecord(
        "ig-actions",
        recordAsIGAction
      )) as IgAction;
    }
    */

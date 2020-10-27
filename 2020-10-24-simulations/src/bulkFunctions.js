const shortid = require("shortid");
const DATASERVICE = require("./DATASERVICE");
const {
  createIgAction,
  postIgAction,
  generateABunchOfDateTimeStringsForPastYear,
} = require("./functions");
const {
  ACTION_TYPE,
  randomChoice,
  IG_ACTION_FLAG,
  addMinutesToDate,
} = require("./utility");
const dataService = new DATASERVICE();

const storyMentionMessages = [
  "Sehr gute Location",
  "Kann ich wirklich nur sehr empfehlen",
  "Alter, hier gibt es sogar WLAN",
  "nices Essen",
  "schmeckt einfach monstermäßig",
  "sehr zu empfehlen",
  "kann man mal machen",
  "kommt alle vorbei",
  "hier gehe ich so gerne essen",
  "einfach göttlich diese Speisen",
  "ein hoch auf uns, Bday heute",
  "Burger ist beste.",
];

async function sendEntireStreak(
  businessID,
  leadID,
  thread_id,
  businessSlugname,
  storyMentionDate
) {
  console.log(`send entire streak for date: ${storyMentionDate}`);
  /*
Ablauf eines streaks:
C_STORYMENTION
...
B_AGB
...
C_AGBCOMPLY
...
B_AGBCOMPLYREPLY
...
B_TICKET
...
    */

  let streakshortid = shortid.generate();

  // C_STORYMENTION:
  let action_C_STORYMENTION = createIgAction(
    businessID,
    leadID,
    ACTION_TYPE.StoryMention,
    false,
    "https://source.unsplash.com/random/720x1280",
    randomChoice(storyMentionMessages),
    thread_id,
    shortid.generate(),
    IG_ACTION_FLAG.C_STORYMENTION,
    streakshortid,
    businessSlugname,
    storyMentionDate
  );
  await postIgAction(action_C_STORYMENTION);

  //B_AGB
  let actionDate = addMinutesToDate(storyMentionDate, 1);
  let action_B_AGB = createIgAction(
    businessID,
    leadID,
    ACTION_TYPE.DirectMessage,
    true,
    null,
    `Hey Vorname, schön, dass du uns so unterstützt. Hier sind unsere AGB, bitte akzeptiere indem du "ja" zurück schreibst.`,
    thread_id,
    shortid.generate(),
    IG_ACTION_FLAG.B_AGB,
    streakshortid,
    businessSlugname,
    actionDate
  );
  await postIgAction(action_B_AGB);

  //C_AGBCOMPLY
  actionDate = addMinutesToDate(actionDate, Math.floor(Math.random() * 10) + 1);
  let action_C_AGBCOMPLY = createIgAction(
    businessID,
    leadID,
    ACTION_TYPE.DirectMessage,
    false,
    null,
    `ja`,
    thread_id,
    shortid.generate(),
    IG_ACTION_FLAG.C_AGBCOMPLY,
    streakshortid,
    businessSlugname,
    actionDate
  );
  await postIgAction(action_C_AGBCOMPLY);

  //B_AGBCOMPLYREPLY
  actionDate = addMinutesToDate(actionDate, 0.5);
  let action_B_AGBCOMPLYREPLY = createIgAction(
    businessID,
    leadID,
    ACTION_TYPE.DirectMessage,
    true,
    null,
    `Super, hier kannst du uns kurz auf Google bewerten, wir generieren derweil deinen Geschenkcode`,
    thread_id,
    shortid.generate(),
    IG_ACTION_FLAG.B_AGBCOMPLYREPLY,
    streakshortid,
    businessSlugname,
    actionDate
  );
  await postIgAction(action_B_AGBCOMPLYREPLY);
  //B_TICKET
  actionDate = addMinutesToDate(actionDate, 1);
  let action_B_TICKET = createIgAction(
    businessID,
    leadID,
    ACTION_TYPE.SendPhoto,
    true,
    "https://praxistipps-images.chip.de/CE9dFTagOZP219OIMS8hHSlADyg=/0x0/filters:format(jpeg):fill(fff,true):no_upscale()/praxistipps.s3.amazonaws.com%2Fqr-code_5332b929.jpg",
    ``,
    thread_id,
    shortid.generate(),
    IG_ACTION_FLAG.B_TICKET,
    streakshortid,
    businessSlugname,
    actionDate
  );
  await postIgAction(action_B_TICKET);
}

async function deleteAllIGActionsOfStreak(streakshortid) {
  let streakRecords = await dataService.getRecords("ig-actions", {
    streakshortid,
  });

  console.log(`${streakRecords.length} records are going to be deleted`);

  for (let i = 0; i < streakRecords.length; i++) {
    const rec = streakRecords[i];
    console.log(rec.id);
    let success = await dataService.deleteRecordByID("ig-actions", rec.id);
    console.log(success);
  }

  //console.log(streakRecords);
}

async function deleteAllSimulatedIGActions() {
  let streakRecords = await dataService.getRecords("ig-actions", {
    simulated: true,
  });

  console.log(`${streakRecords.length} records are going to be deleted`);

  for (let i = 0; i < streakRecords.length; i++) {
    const rec = streakRecords[i];
    console.log(rec.id);
    let success = await dataService.deleteRecordByID("ig-actions", rec.id);
    console.log(success);
  }
}

async function sendStreaksOf1Year1Lead(
  businessID,
  leadID,
  thread_id,
  businessSlugname
) {
  // 1. generate dates for the streaks to happen:
  let dates = generateABunchOfDateTimeStringsForPastYear(12); // 12 per month, randomly distributed throughout each month

  let promises = [];

  for (let i = 0; i < dates.length; i++) {
    const d = new Date(dates[i]);
    await sendEntireStreak(businessID, leadID, thread_id, businessSlugname, d);
    /*
    promises.push(
      sendEntireStreak(businessID, leadID, thread_id, businessSlugname, d)
    );
    */
  }
  //await Promise.all(promises);
}
module.exports = {
  sendEntireStreak,
  deleteAllIGActionsOfStreak,
  deleteAllSimulatedIGActions,
  sendStreaksOf1Year1Lead,
};

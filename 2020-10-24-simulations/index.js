const {
  postIgAction,
  createIgAction,
  generateABunchOfDateTimeStringsForPastYear,
} = require("./src/functions");
const {
  deleteAllIGActionsOfStreak,
  deleteAllSimulatedIGActions,
  sendEntireStreak,
  sendStreaksOf1Year1Lead,
} = require("./src/bulkFunctions");
const { ACTION_TYPE, IG_ACTION_FLAG } = require("./src/utility");
const DATASERVICE = require("./src/DATASERVICE");
const shortid = require("shortid");

async function run() {
  await deleteAllSimulatedIGActions();
}

async function run2() {
  let businessID = "5f7da5388384322c9cc09692"; // erikws
  //let leadID = "5f80b59a23efe01624490003"; //laragorschke
  let lead2ID = "5f96ab53171c0d6c94f47527"; //lolamaria32  just a lead, not an actual account
  let threadID = shortid.generate() + shortid.generate() + shortid.generate();
  await sendStreaksOf1Year1Lead(businessID, lead2ID, threadID, "erikws");
}

run2();

// business 1: 5f7da5388384322c9cc09692 erikws
// lead 1: 5f80b59a23efe01624490003 laragorschke

/*
  let igAction = createIgAction(
    "5f7da5388384322c9cc09692",
    "5f80b59a23efe01624490003",
    ACTION_TYPE.DirectMessage,
    false,
    null,
    "Testnachricht",
    "1234567890",
    "12345",
    null,
    "abcshortid",
    "dasbusiness"
  );


    //await postIgAction(igAction);
  */

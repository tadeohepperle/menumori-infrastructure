import { writeFileSync } from "fs";
import { IgApiClient } from "instagram-private-api";
import { JsonParser, RealtimeClient } from "instagram_mqtt";
import DATASERVICE from "../src/DATASERVICE";
import {
  objectToQueryString,
  waitPromiseRandomizeTime,
} from "../src/DATASERVICE/utility";
import STARTUPPERFORMER from "../src/STARTUPPERFORMER";
import { BotEmittingEvents, IgIncomingEventData } from "../src/types";

if (false) {
  test("queryStringConstructor", () => {
    expect(
      objectToQueryString({ slugname: "devinas-fischrestaurant", _limit: 5 })
    ).toBe("?slugname=devinas-fischrestaurant&_limit=5");
  });

  test("axiospost", async () => {
    let st = new STARTUPPERFORMER();
    let dataSercice = new DATASERVICE(st);
    await dataSercice.run();
    let newlead = {
      full_name: "Lu Meiners",
      username: "olsusbds",
      user_id: 12312,
      businesses: ["5f7da5388384322c9cc09692"],
    };
    let lead = await dataSercice.postRecord("leads", newlead);
    console.log(lead);
    expect(lead).toBeTruthy();
  });

  test("axios_update", async () => {
    let st = new STARTUPPERFORMER();
    let dataSercice = new DATASERVICE(st);
    await dataSercice.run();
    let newlead = {
      id: "5f7ef7b32f544c26b0cc3db2",
      full_name: "Lu Monaso",
    };
    let lead = await dataSercice.updateRecord("leads", newlead);
    console.log(lead);
    expect(lead).toBeTruthy();
  });
}

test("incomingeventshandler", async () => {
  let st = new STARTUPPERFORMER();
  await st.run();
  // get first bot:
  let bi =
    st.botKeeperService.botInstances[
      Object.keys(st.botKeeperService.botInstances)[0]
    ];
  // send direct message event:

  let eventData = {
    date: new Date("2020-10-08T16:13:46.873Z"),
    type: BotEmittingEvents.DirectMessage,
    user_id: 41804726835,
    thread_id: "340282366841710300949128279829602550299",
    item_id: "29554886868555831834957347586834432",
    text: "Ai wie gehts?",
  };
  bi.emit(BotEmittingEvents.DirectMessage, eventData);

  /*
  await waitPromiseRandomizeTime(4000, 4000);
  let res = await bi.igClient.user.info(41804726835); // gives profile pic and username
  writeFileSync("XXXigtestuserinfo.json", JSON.stringify(res));
  let res2 = await bi.igClient.user.accountDetails(41804726835);
  writeFileSync("XXXigtestuseraccountdetails.json", JSON.stringify(res2));
  */
});

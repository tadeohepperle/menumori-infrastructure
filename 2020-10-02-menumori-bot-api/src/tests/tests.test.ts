import { writeFileSync } from "fs";
import { IgApiClient } from "instagram-private-api";
import { JsonParser, RealtimeClient } from "instagram_mqtt";
import IgBotV20201004 from "../BOTKEEPERSERVICE/BotBehaviors/IgBotV20201004";
import DATASERVICE from "../DATASERVICE";
import {
  objectToQueryString,
  pythonStringFormat,
  waitPromiseRandomizeTime,
} from "../DATASERVICE/utility";
import STARTUPPERFORMER from "../STARTUPPERFORMER";
import {
  BotEmittingEvents,
  IgIncomingEventData,
  IgLead,
  IgAction,
} from "../types";

if (false) {
  test("queryStringConstructor", () => {
    expect(
      objectToQueryString({ slugname: "devinas-fischrestaurant", _limit: 5 })
    ).toBe("?slugname=devinas-fischrestaurant&_limit=5");
  });

  test("axiospost", async () => {
    let st = new STARTUPPERFORMER("IG");
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
    let st = new STARTUPPERFORMER("IG");
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

  test("incomingeventshandler", async () => {
    let st = new STARTUPPERFORMER("IG");
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
}

test("format", async () => {
  let st = new STARTUPPERFORMER("IG");
  let lead: IgLead = {
    businesses: ["5f7da5388384322c9cc09692"],
    _id: "5f7f56613d491248984a02a1",
    user_id: 41804726835,
    username: "laragorschke",
    biography: "Jetzt steckt es mich aber richtig an. #corona",
    profile_pic_url:
      "https://instagram.frix7-1.fna.fbcdn.net/v/t51.2885-19/s150x150/119160072_334033141362011_2720734195357897433_n.jpg?_nc_ht=instagram.frix7-1.fna.fbcdn.net&_nc_ohc=ckfZEdJVSkIAX_Er4fc&oh=80e6963a7072802ed4117c2b99c83628&oe=5FA924A9",
    full_name: "Lara Gorschke",
    media_count: 3,
    follower_count: 0,
    following_count: 18,
    mutual_followers_count: 0,
    is_verified: false,
    is_private: false,
    has_anonymous_profile_picture: false,
    following_tag_count: 0,
    external_url: "http://www.google.com/",
    is_business: false,
    whatsapp_number: "",
    createdAt: "2020-10-08T18:11:45.709Z",
    updatedAt: "2020-10-09T11:54:32.578Z",
    __v: 0,
    id: "5f7f56613d491248984a02a1",
  } as IgLead;

  let igAction = {
    confirmed: false,
    action_type: "DirectMessage",
    flag: null,
    _id: "5f7fa42e52401b208cfc3923",
    thread_id: "29555384691368603607210400445104128",
    content_text:
      'Hey Lara!\nDanke, dass du uns dabei hilfst, mehr Menschen für unser Restaurant zu begeistern. \nAls Dankeschön erhältst du gleich ein Geschenk. Vorher müsstest du allerdings noch unseren AGB (http://localhost:4000/a/h23sa7) zustimmen, indem du uns ein einfaches "ja" zurückschreibst. ',
    direction_b_to_l: true,
    createdAt: "2020-10-08T23:43:42.341Z",
    updatedAt: "2020-10-09T17:15:01.532Z",
    __v: 0,
    business: "5f7da5388384322c9cc09692",
    lead: "5f7f56613d491248984a02a1",
    id: "5f7fa42e52401b208cfc3923",
  } as IgAction;

  await st.run();

  let bi =
    st.botKeeperService.botInstances[
      Object.keys(st.botKeeperService.botInstances)[1]
    ];
  if (bi.botBehavior instanceof IgBotV20201004) {
    let botbehav: IgBotV20201004 = bi.botBehavior;
    let checked = await botbehav.checkIfIgActionIsAGBComply(lead, igAction);
    console.log(checked);
  }
});

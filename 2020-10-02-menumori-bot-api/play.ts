import IgBotV20201004 from "./src/BOTKEEPERSERVICE/BotBehaviors/IgBotV20201004";
import STARTUPPERFORMER from "./src/STARTUPPERFORMER";
import { IgLead, IgAction } from "./src/types";

const run = async () => {
  let st = new STARTUPPERFORMER();
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
    content_text: "ähm was?",
    direction_b_to_l: true,
    createdAt: "2020-10-09T19:43:42.341Z",
    updatedAt: "2020-10-09T09:15:01.532Z",
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
};

run();

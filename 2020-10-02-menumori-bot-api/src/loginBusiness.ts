import { writeFileSync } from "fs";
import STARTUPPERFORMER from "./STARTUPPERFORMER";

/*

[
    'C:\\Users\\tadeo\\Desktop\\Unternehmen\\Prangerle Solutions\\Menumori\\2020-10-02-infrastruktur\\2020-10-02-menumori-bot-api\\node_modules\\ts-node\\dist\\bin.js',
    'C:\\Users\\tadeo\\Desktop\\Unternehmen\\Prangerle Solutions\\Menumori\\2020-10-02-infrastruktur\\2020-10-02-menumori-bot-api\\src\\loginBusiness.ts',
    'business_slugname'
]

*/

run();
async function run() {
  let businessSlugname = process.argv[2];
  console.log(
    `Got BusinessSlugname ${businessSlugname} from commandline arguments...`
  );
  if (!businessSlugname || !(typeof businessSlugname === "string")) return;

  // START SERVICES:
  let s = new STARTUPPERFORMER("NORUN");
  s.SETTINGS.USEPROXY = false;
  await s.dataService.run();
  // get business from API:
  console.log(
    `...Trying to get Business from Strapi API with slugname: ${businessSlugname}`
  );
  let business = await s.dataService.getBusinessBySlugname(businessSlugname);
  if (!business) {
    console.log(
      `Could not get Data for Business with slugname ${businessSlugname} from Strapi API`
    );
    return;
  }
  console.log(`Successfully retrieved Business.`);
  // register new bot for business in Botkeeperservice:
  s.botKeeperService.registerNewBot(business);
  let botInstance = s.botKeeperService.getBotInstanceByBusinessID(business.id);
  let session = await botInstance.igPasswordLogin();
  console.log(`----------------------------------------------------`);
  console.log(session);
  console.log(`----------------------------------------------------`);
  console.log(
    `successfully generated ig_session_store for business: ${businessSlugname} and updated BusinessData in Database. (BusinessData.id=${business.business_data.id})`
  );
}

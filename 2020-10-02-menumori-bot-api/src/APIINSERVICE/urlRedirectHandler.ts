import APIINSERVICE from "../APIINSERVICE";
import { Request, Response } from "express";
import { Business } from "../types";

// is called by next js frontend every time someone scans a qr code.
// we redirect to the companies ig-page and increment a counter (create a record for the scan) in the database
export const instagramUrlHandler = (apiInService: APIINSERVICE) => {
  return async (req: Request, res: Response) => {
    try {
      let slugname = req.params.slugname;
      if (slugname) {
        let business = await apiInService.STARTUPPERFORMER.dataService.getBusinessBySlugname(
          slugname
        );

        if (business?.business_settings?.ig_settings?.username) {
          // send instagram url
          let ig_username = business.business_settings.ig_settings.username;
          res.json({
            url: `https://www.instagram.com/${ig_username}/`,
          });
          // increment counter to know number of scans
          // TODO ____________ change to real position of qr code
          await logToScanLogs(business, 1, "INSTAGRAMURL", apiInService);
        } else res.status(400).send();
      } else res.status(400).send();
    } catch (ex) {
      apiInService.STARTUPPERFORMER.dataService.handleException(ex, 1);
      res.status(400).send();
    }
  };
};

export const ratingUrlHandler = (apiInService: APIINSERVICE) => {
  return async (req: Request, res: Response) => {
    try {
      let slugname = req.params.slugname;
      if (slugname) {
        let business = await apiInService.STARTUPPERFORMER.dataService.getBusinessBySlugname(
          slugname
        );

        if (business?.business_settings?.rating_url) {
          // send rating url:
          res.json({
            url: business.business_settings.rating_url,
            platform: business.business_settings?.rating_platform,
          });
          // log this action in database:
          await logToScanLogs(business, undefined, "RATINGURL", apiInService);
        } else res.status(400).send();
      } else res.status(400).send();
    } catch (ex) {
      apiInService.STARTUPPERFORMER.dataService.handleException(ex, 1);
      res.status(400).send();
    }
  };
};

async function logToScanLogs(
  business: Business,
  qrcode_position: number | string | undefined,
  flag: string,
  apiInService: APIINSERVICE
) {
  let record = {
    business: business.id,
    business_ig_username: business.business_settings?.ig_settings?.username,
    qrcode_position: qrcode_position,
    flag: flag,
    // createdAt is set automatically by strapi
    // later we might track browser versions, cookies, etc... and save it as well
  };
  await apiInService.STARTUPPERFORMER.dataService.postRecord(
    "scanlogs",
    record
  );
}

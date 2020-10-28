import APIINSERVICE from "../APIINSERVICE";
import { Request, Response } from "express";

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
          let record = {
            business: business.id,
            business_ig_username: ig_username,
            qrcode_position: 1, // TODO ____________ change to real position of qr code
            // createdAt is set automatically by strapi
            // later we might track browser versions, cookies, etc... and save it as well
          };
          await apiInService.STARTUPPERFORMER.dataService.postRecord(
            "scanlogs",
            record
          );
        } else res.status(400).send();
      } else res.status(400).send();
    } catch (ex) {
      apiInService.STARTUPPERFORMER.dataService.handleException(ex, 1);
      res.status(400).send();
    }
  };
};

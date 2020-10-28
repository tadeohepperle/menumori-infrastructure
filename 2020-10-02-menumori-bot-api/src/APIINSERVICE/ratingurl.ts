import APIINSERVICE from "../APIINSERVICE";

import express, { Request, Response } from "express";
import { Business } from "../types";

export const ratingUrlHandler = (apiInService: APIINSERVICE) => {
  return async (req: Request, res: Response) => {
    try {
      let slugname = req.params.slugname;
      if (slugname) {
        let business = await apiInService.STARTUPPERFORMER.dataService.getBusinessBySlugname(
          slugname
        );

        if (business?.business_settings?.rating_url) {
          res.json({
            url: business.business_settings.rating_url,
          });
        } else res.status(400).send();
      } else res.status(400).send();
    } catch (ex) {
      apiInService.STARTUPPERFORMER.dataService.handleException(ex, 1);
      res.status(400).send();
    }
  };
};

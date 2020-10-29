import axios from "axios";
import { Request, Response } from "express";
import APIINSERVICE from "../APIINSERVICE";
import { IgAction, IgActionFlag } from "../types";

export const businessStatsHandler = (apiInService: APIINSERVICE) => {
  return async (req: Request, res: Response) => {
    try {
      // PROCESS INCOMING REQUEST INPUT:
      let businessID = req.params.businessid;
      let jwt = req.headers.authorization;
      let limitstorymentions =
        req.query.limitstorymentions &&
        typeof req.query.limitstorymentions === "string"
          ? parseInt(req.query.limitstorymentions)
          : 4;
      let startdateAsString =
        req.query.startdate && typeof req.query.startdate === "string"
          ? req.query.startdate
          : "2000-01-01";
      let enddateAsString =
        req.query.enddate && typeof req.query.enddate === "string"
          ? req.query.enddate
          : "2040-01-01";
      if (!businessID || !jwt) throw Error("no jwt or businessID provided");

      // VALIDATE JWT FOR THIS BUSINESS:
      // try to fetch businessData for business with businessID using the jwt:
      // --> gives indication if jwt is valid for the business:

      let { data: business } = await axios.get(
        `${apiInService.SETTINGS.STRAPIURL}/businesses/${businessID}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      if (!businessID) throw Error("jwt was not valid for business.");

      // AGGREGATE DATA:

      let storyMentionRecords = (await apiInService.STARTUPPERFORMER.dataService.getRecords(
        "ig-actions",
        {
          flag: IgActionFlag.C_STORYMENTION,
          business: businessID,
          _sort: "createdAt:desc",
          _limit: limitstorymentions,
          createdAt_gte: startdateAsString,
          createdAt_lte: enddateAsString,
        }
      )) as IgAction[];

      let storyMentionsMapped = storyMentionRecords.map((el) => {
        let objectForFrontend: any = {
          date: el.createdAt,
          content_text: el.content_text,
        };

        if (typeof el.lead != "string") {
          objectForFrontend.username = el.lead.username;
          objectForFrontend.follower_count = el.lead.follower_count;
          objectForFrontend.full_name = el.lead.full_name;
        }

        if (el.content_media?.url) {
          objectForFrontend.media_url = el.content_media.url;
          objectForFrontend.media_url_thumbnail =
            el.content_media?.formats?.thumbnail?.url;
        }

        return objectForFrontend;
      });

      // calculate other stats:

      // SEND DATA:
      res.json({ storyMentions: storyMentionsMapped });
    } catch (ex) {
      apiInService.STARTUPPERFORMER.dataService.handleException(ex, 1);
      return res
        .status(403)
        .send(
          "You are not authorized to retrieve statistics for this business."
        );
    }
  };
};

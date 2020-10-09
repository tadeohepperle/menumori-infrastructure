import express, { Request, Response } from "express";
import APIINSERVICE from "../APIINSERVICE";
import BotInstance from "../BOTKEEPERSERVICE/BotInstance";
import STARTUPPERFORMER from "../STARTUPPERFORMER";

export const businessChangeHandler = (apiInService: APIINSERVICE) => {
  return (req: Request, res: Response) => {
    if (
      req.headers.authorization != apiInService.SETTINGS.INTERNALSERVICESSECRET
    ) {
      res
        .status(403)
        .send(
          "You did not provide the correct secret to trigger the business-changed endpoint. Only internal services chould be allowed to trigger it."
        );
    } else if (!req.body.id || !req.body.flag) {
      res
        .status(404)
        .send(
          "Request Body is malformatted. Body has to be like this: {id: string, flag: string}"
        );
    } else {
      updateBotInstance(
        req.body.id,
        req.body.flag,
        apiInService.STARTUPPERFORMER
      );
      let businessID = req.body.id;
      let flag = req.body.flag;
      //console.log(businessID, flag);
      res.send("OK");
      //
    }
  };
};

/**
 * updates the field business of the bot which is running the businesses instagram account. The bot is identified via the botkeeper.
 *
 * @param businessID
 * @param flag
 * @param startUpFormer
 */

async function updateBotInstance(
  businessID: string,
  flag: string,
  startUpPerformer: STARTUPPERFORMER
) {
  try {
 switch (flag) {
      case "UPDATE":
        await startUpPerformer.botKeeperService.updateBotBusiness(businessID);
        break;
      case "CREATE":
        await startUpPerformer.botKeeperService.registerNewBotByID(businessID);
        break;
      case "DELETE":
        await startUpPerformer.botKeeperService.deleteBot(businessID);
        break;
      default:
        throw new Error(`Error: /business-changed with unknown flag: ${flag}`);
    }
  } catch (ex) {
    console.error(ex);
  }
}

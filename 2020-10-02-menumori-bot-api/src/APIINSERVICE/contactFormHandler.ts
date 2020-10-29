import axios from "axios";
import { Request, Response } from "express";
import APIINSERVICE from "../APIINSERVICE";

const viableMessageFlags = ["NEWSLETTERSIGNUP", "CONTACTFORM"];

export const contactFormHandler = (apiInService: APIINSERVICE) => {
  return async (req: Request, res: Response) => {
    try {
      // PROCESS INCOMING REQUEST INPUT:#

      let record = {
        message: req.body.message,
        name: req.body.name,
        email: req.body.email,
        flag: req.body.flag,
      };

      if (viableMessageFlags.find((flag) => flag === record.flag)) {
        // post Object to Database Collection contact-messages:
        apiInService.STARTUPPERFORMER.dataService.postRecord(
          "contact-messages",
          record
        );
      }

      res.json({
        message:
          "Die Nachricht wurde erfolgreich versandt. Vielen Dank für Ihre Anfrage!",
      });
    } catch (ex) {
      apiInService.STARTUPPERFORMER.dataService.handleException(ex, 1);
      return res
        .status(500)
        .send(
          "Die Nachricht konnte nicht gesendet werden, es gab einen unbekannten Serverfehler."
        );
    }
  };
};

import QRCode from "qrcode";
import fs, { promises } from "fs";
// @ts-ignore
import textToImage from "text-to-image";
import Jimp from "jimp";
import { Business, IgAction, IgLead, Settings } from "../types";
import { formatDateGerman } from "./utility";
import STARTUPPERFORMER from "../STARTUPPERFORMER";
const outputpath = "./data";
const resourcepath = "./src/resources";
const brackgroundfile = "background.jpg";
const qrcodecolor = "#000000"; // cc = 204/255 = 0.8
const textopacity = 0.7;
const textColor = "black";

function dataURIToBuffer(dataURI: string) {
  // "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==";
  let regex = /^data:.+\/(.+);base64,(.*)$/;

  let matches = dataURI.match(regex);
  if (!matches || !matches[0] || !matches[1]) throw new Error("no macthes!");
  let ext = matches[1];
  var data = matches[2];
  return Buffer.from(data, "base64");
}

const positions: { [id: string]: number[] } = {
  QRCODE: [250, 350],
  CAPTION1: [223, 170],
  BESCHREIBUNG: [250, 260],
  BUSINESSNAME: [250, 780],
  CONTACT: [250, 900],
  CODEONSIDE: [682, 350],
  MENUMORIONSIDE: [185, 350],
};

export async function generateTicketImage(
  lead: IgLead,
  business: Business,
  complyAction: IgAction,
  settings: Settings,
  startUpPerformer: STARTUPPERFORMER
): Promise<Buffer | void> {
  try {
    if (
      !(
        complyAction.createdAt &&
        complyAction.streakshortid &&
        business.business_settings.gift &&
        (business.business_settings.gift_deadline_days ||
          business.business_settings.gift_deadline_days === 0) &&
        lead.full_name &&
        lead.username &&
        business.business_settings.adress
      )
    )
      throw new Error(`Information Missing to Generate Photo! Needed: complyAction.createdAt &&
      complyAction.streakshortid &&\n
      business.business_settings.gift &&\n
      business.business_settings.gift_deadline_days &&\n
      lead.full_name &&\n
      lead.username &&\n
      business.business_settings.adress \n
      Got: lead: ${JSON.stringify(lead)}, business: ${JSON.stringify(
        business
      )}, 
      complyAction: ${JSON.stringify(complyAction)}, settings: ${JSON.stringify(
        settings
      )}
      `); // ____________ Better error code!!!! with json

    // setting variables

    let deadlineDate = new Date(complyAction.createdAt);
    deadlineDate.setDate(
      deadlineDate.getDate() + business.business_settings.gift_deadline_days
    );

    let deadlineForGiftString = formatDateGerman(deadlineDate);
    let geschenkcode = complyAction.streakshortid;
    // get the backgroundimage:
    let imgBackground = await Jimp.read(`${resourcepath}/${brackgroundfile}`);
    // generate url the qr code leads to: (at the moment this is basically meaningless)
    let QRCODE = await Jimp.read(await generateQRCode());
    QRCODE.opacity(textopacity);
    imgBackground.composite(
      QRCODE,
      positions["QRCODE"][0],
      positions["QRCODE"][1]
    );
    // TEXTELEMENTS:

    // title: "Geschenkcode"
    let CAPTION1 = await generateTextAsJimpBitmap(
      "GUTSCHEIN",
      60,
      470,
      100,
      0,
      "center",
      "Arial Black"
    );
    CAPTION1.opacity(textopacity);
    imgBackground.composite(
      CAPTION1,
      positions["CAPTION1"][0],
      positions["CAPTION1"][1]
    );
    // beschreibung:
    let beschreibungstext = `${business.business_settings.gift} \n Gültig bis: ${deadlineForGiftString}.`;
    let BESCHREIBUNG = await generateTextAsJimpBitmap(
      beschreibungstext,
      24,
      416,
      32,
      0,
      "center",
      "Sans"
    );
    BESCHREIBUNG.opacity(textopacity);
    imgBackground.composite(
      BESCHREIBUNG,
      positions["BESCHREIBUNG"][0],
      positions["BESCHREIBUNG"][1]
    );
    // businessname below qr code:
    let BUSINESSNAME = await generateTextAsJimpBitmap(
      `${business.business_settings.title}`,
      40,
      416,
      50,
      0,
      "center",
      "Arial Black"
    );
    BUSINESSNAME.opacity(textopacity);
    imgBackground.composite(
      BUSINESSNAME,
      positions["BUSINESSNAME"][0],
      positions["BUSINESSNAME"][1]
    );
    // business contact:
    let contactText = `Email: ${business.business_settings.contact.email}\n${business.business_settings.adress.street_name} ${business.business_settings.adress.house_number}, ${business.business_settings.adress.zip_code} ${business.business_settings.adress.house_number}, ${business.business_settings.adress.city}`;
    let CONTACT = await generateTextAsJimpBitmap(
      contactText,
      18,
      416,
      24,
      0,
      "center",
      "Sans"
    );
    CONTACT.opacity(textopacity);
    imgBackground.composite(
      CONTACT,
      positions["CONTACT"][0],
      positions["CONTACT"][1]
    );

    // geschenkcode on side:
    let geschenkcodeLines = geschenkcode.split("").join("\n");
    let CODEONSIDE = await generateTextAsJimpBitmap(
      geschenkcodeLines,
      40,
      60,
      50,
      0,
      "center",
      "Arial Black"
    );
    CODEONSIDE.opacity(textopacity);
    imgBackground.composite(
      CODEONSIDE,
      positions["CODEONSIDE"][0],
      positions["CODEONSIDE"][1]
    );
    // menumori on side:
    let menumorilines = "MENUMORI".split("").join("\n");
    let MENUMORIONSIDE = await generateTextAsJimpBitmap(
      menumorilines,
      40,
      60,
      50,
      0,
      "center",
      "Arial Black"
    );
    MENUMORIONSIDE.opacity(textopacity);
    imgBackground.composite(
      MENUMORIONSIDE,
      positions["MENUMORIONSIDE"][0],
      positions["MENUMORIONSIDE"][1]
    );

    // return the buffer:
    //let outputBuffer = await imgBackground.getBufferAsync(Jimp.MIME_PNG);

    let path = `./temp/${complyAction.streakshortid}.jpg`;
    // insta does not accept the buffer if returned right away. So we first write image to a file and then read in this file again:
    await imgBackground.writeAsync(path);
    let outputBuffer = await promises.readFile(path);
    promises.unlink(path);
    return outputBuffer;
  } catch (ex) {
    startUpPerformer.dataService.handleException(ex);
    return;
  }

  /////////////////////////////////////////////////////////////////////
  // functions
  async function generateQRCode() {
    let url = `${settings.FRONTENDURL}/t/${complyAction.streakshortid}`;
    let qrCodeAsBuffer = await QRCode.toBuffer(url, {
      color: {
        dark: qrcodecolor, // Blue dots
        light: "#0000", // Transparent background
      },
      width: 416,
      margin: 0,
    });
    return qrCodeAsBuffer;
  }

  async function generateTextAsJimpBitmap(
    text: string,
    fontSize: number,
    maxWidth: number,
    lineHeight: number,
    margin: number,
    textAlign: "left" | "right" | "center",
    fontFamily: "Arial" | "Arial Black" | "Sans"
  ) {
    let dataURI = await textToImage.generate(text, {
      maxWidth,
      fontSize,
      fontFamily,
      lineHeight,
      margin,
      bgColor: "transparent",
      textColor,
      textAlign,
    });
    let buffer = dataURIToBuffer(dataURI) as Buffer;
    return await Jimp.read(buffer);
  }
}

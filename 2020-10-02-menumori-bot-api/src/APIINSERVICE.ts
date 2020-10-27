import express from "express";
import cors from "cors";
import { SERVICE } from "./types";
import socketIo from "socket.io";
import http from "http";
import { businessChangeHandler } from "./APIINSERVICE/businessChangeHandler";
import { ratingUrlHandler } from "./APIINSERVICE/ratingurl";
import {
  allPublicBusinessDataHandler,
  publicBusinessDataHandler,
  shallowBusinessDataByBusinessIds,
} from "./APIINSERVICE/publicBusinessDataHandler";
import { businessStatsHandler } from "./APIINSERVICE/businessStatsHandler";

export default class APIINSERVICE extends SERVICE {
  async run() {
    const FLAG = this.STARTUPPERFORMER.flag;
    //console.log("APIINSERVICE startup...");

    // EXPRESS SETUP:
    const app = express();
    app.use(cors());
    app.use(express.json());
    // EXPRESS ROUTES
    app.get("/", (req, res) => {
      res.json({
        good: "yes",
        name: "Tadeo",
      });
    });

    if (FLAG == "PAPI") {
      app.get("/ratingurl/:slugname", ratingUrlHandler(this));
      app.get("/businessdata/:slugname", publicBusinessDataHandler(this));
      app.get("/allbusinessdata", allPublicBusinessDataHandler(this));
      app.get("/businessstats/:businessid", businessStatsHandler(this));
      app.post("/businessesbyids", shallowBusinessDataByBusinessIds(this));
    } else {
      app.post("/business-changed", businessChangeHandler(this));
    }

    // CREATE A SERVER FROM APP
    const server = http.createServer(app);

    // SOCKET IO WEBSOCKET CONNECTIONS
    if (FLAG != "PAPI") {
      const io = socketIo(server);
      io.on("connection", (socket) => {
        // each client need to be assigned a bot_instance. If no bot_instance can be assigned the connection is rejected.
        // Bot instances are only created for all existing businesses when the entire node project is started.
        // Later on when new Businesses are created, upon creating the business the botkeeperservice is notified and creates a bot instance

        console.log("a user connected");
      });
    }

    // SERVER LISTEN

    const port =
      FLAG == "PAPI" ? this.SETTINGS.PAPIPORT : this.SETTINGS.BOTAPIPORT;

    await new Promise((res, rej) => {
      server.listen(port, () =>
        res(
          console.log(
            `APISERVICE IN MODE "${this.STARTUPPERFORMER.flag}" IS NOW LISTENING ON PORT ${port}`
          )
        )
      );
    });

    //console.log("APIINSERVICE startup successful!");
  }
}

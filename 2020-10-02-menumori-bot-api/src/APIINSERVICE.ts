import express from "express";
import cors from "cors";
import { SERVICE } from "./types";
import socketIo from "socket.io";
import http from "http";
import { businessChangeHandler } from "./APIINSERVICE/business-change-handler";

export default class APIINSERVICE extends SERVICE {
  async run() {
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

    app.post("/business-changed", businessChangeHandler(this));

    // CREATE A SERVER FROM APP
    const server = http.createServer(app);

    // SOCKET IO WEBSOCKET CONNECTIONS
    const io = socketIo(server);
    io.on("connection", (socket) => {
      // each client need to be assigned a bot_instance. If no bot_instance can be assigned the connection is rejected.
      // Bot instances are only created for all existing businesses when the entire node project is started.
      // Later on when new Businesses are created, upon creating the business the botkeeperservice is notified and creates a bot instance

      console.log("a user connected");
    });

    // SERVER LISTEN

    await new Promise((res, rej) => {
      server.listen(this.SETTINGS.BOTAPIPORT, () =>
        res(
          console.log(
            `APISERVICE IS NOW LISTENING ON PORT ${this.SETTINGS.BOTAPIPORT}`
          )
        )
      );
    });

    //console.log("APIINSERVICE startup successful!");
  }
}

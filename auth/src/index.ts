import express, { Express } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import passport from "passport";
import cookieSession from "cookie-session";
import { logger } from "./logger";

import "./passport-setup";

import { initAuthRoutes } from "./routes/googleAuth";
import { Producer } from "@js-alt-poll/common";

const p = new Producer("userProducer", "myExchange");
p.init();

const app = express();

app.get("/auth/testMessage", (req, res) => {
  p.publish("user.updated", "test msg");
  res.send("message sent");
});

app.set("trust proxy", true);
app.use(cors());
app.use(bodyParser.json());
app.use(
  cookieSession({
    signed: false,
    secure: true,
  }) as Express
);

app.use(passport.initialize());
app.use(passport.session());

initAuthRoutes(app);

app.listen(3000, () => {
  logger.info("listenning on port 3000");
});

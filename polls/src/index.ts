import express, { Express } from "express";
import passport from "passport";
import cors from "cors";
import bodyParser from "body-parser";
import cookieSession from "cookie-session";

import { logger } from "./logger";
import { UserCreatedConsumer } from "./messaging/UserCreatedConsumer";
import { initPollRoutes } from "./routes/pollRoutes";
import { UserDbProps } from "@js-alt-poll/common";

import "./passport-setup";

declare namespace Express {
  interface Request {
    currentUser: UserDbProps | undefined;
  }
}

const app = express();

app.set("trust proxy", true);
app.use(cors());
app.use(bodyParser.json());
app.use(
  cookieSession({
    signed: false,
    secure: false,
  }) as Express
);

// passport setup
app.use(passport.initialize());
app.use(passport.session());

// Routes
initPollRoutes(app);

// Messaging Consumers
new UserCreatedConsumer().init();

app.listen(3000, () => {
  logger.info("listening on port 3000");
});

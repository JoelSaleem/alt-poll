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
import { initOptionRoutes } from "./routes/optionRoutes";
import { initOtpRoutes } from "./routes/otpRoutes";

declare namespace Express {
  interface Request {
    currentUser?: UserDbProps;
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
initOptionRoutes(app);
// initOtpRoutes(app); // Moved to votes

// Messaging Consumers
new UserCreatedConsumer().init(
  process.env.RABBIT_HOSTNAME as string,
  process.env.RABBIT_USERNAME as string,
  process.env.RABBIT_PASSWORD as string,
  Number(process.env.RABBIT_PORT)
);

app.listen(3000, () => {
  logger.info("listening on port 3000");
});

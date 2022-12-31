import express, { Express } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieSession from "cookie-session";
import passport from "passport";
import { PollCreatedConsumer } from "./messaging/PollCreatedConsumer";
import { PollUpdatedConsumer } from "./messaging/PollUpdatedConsumer";
import { UserCreatedConsumer } from "./messaging/UserCreatedConsumer";
import { initVoteRoutes } from "./routes/voteRoutes";

import "./passport-setup";
import { OptionCreatedConsumer } from "./messaging/OptionCreatedConsumer";
import { OptionUpdatedConsumer } from "./messaging/OptionUpdatedConsumer";
import { initOtpRoutes } from "./routes/otpRoutes";
import { initOptionRoutes } from "./routes/optionRoutes";

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

new UserCreatedConsumer().init(
  process.env.RABBIT_HOSTNAME as string,
  process.env.RABBIT_USERNAME as string,
  process.env.RABBIT_PASSWORD as string,
  Number(process.env.RABBIT_PORT)
);
new PollCreatedConsumer().init(
  process.env.RABBIT_HOSTNAME as string,
  process.env.RABBIT_USERNAME as string,
  process.env.RABBIT_PASSWORD as string,
  Number(process.env.RABBIT_PORT)
);
new PollUpdatedConsumer().init(
  process.env.RABBIT_HOSTNAME as string,
  process.env.RABBIT_USERNAME as string,
  process.env.RABBIT_PASSWORD as string,
  Number(process.env.RABBIT_PORT)
);
new OptionCreatedConsumer().init(
  process.env.RABBIT_HOSTNAME as string,
  process.env.RABBIT_USERNAME as string,
  process.env.RABBIT_PASSWORD as string,
  Number(process.env.RABBIT_PORT)
);
new OptionUpdatedConsumer().init(
  process.env.RABBIT_HOSTNAME as string,
  process.env.RABBIT_USERNAME as string,
  process.env.RABBIT_PASSWORD as string,
  Number(process.env.RABBIT_PORT)
);

initVoteRoutes(app);
initOtpRoutes(app);
initOptionRoutes(app);

app.listen(3000, () => {
  console.log("Listening on port: 3000");
});

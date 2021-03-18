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

new UserCreatedConsumer().init();
new PollCreatedConsumer().init();
new PollUpdatedConsumer().init();

initVoteRoutes(app);

app.listen(3000, () => {
  console.log("Listening on port: 3000");
});

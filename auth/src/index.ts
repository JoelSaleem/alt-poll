import express, { Express } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import passport from "passport";
import cookieSession from "cookie-session";
import { logger } from "./logger";

import "./passport-setup";

import { googleAuth } from "./routes/googleAuth";

const app = express();
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

googleAuth(app);

app.get("/auth/current_user", (req, res) => {
  res.send(req.user);
});

app.listen(3000, () => {
  logger.info("listenning on port 3000");
});

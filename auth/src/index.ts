import express, { Express } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import passport from "passport";
import cookieSession from "cookie-session";

// import "./passport-setup";

import { logger } from "./logger";
import { initRoutes } from "./routes";

// logger.info("secret key", process.env);
logger.info("this is a test");
logger.warn("this is a test");

const app = express();

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

initRoutes(app);

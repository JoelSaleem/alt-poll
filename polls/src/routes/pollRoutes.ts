import { UserDbProps } from "@js-alt-poll/common";
import { Express } from "express";
import { body } from "express-validator";

declare global {
  namespace Express {
    interface Request {
      // @ts-ignore
      user: User | undefined;
    }
  }
}

export const initPollRoutes = (app: Express) => {
  app.get("/polls", body("title").exists(), (req, res) => {
    console.log("req.user", req?.user);
    res.send({});
  });
};

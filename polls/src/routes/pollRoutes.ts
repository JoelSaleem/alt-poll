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
  app.post("/polls", body("title").exists(), (req, res) => {
    console.log("req.user", req?.user);
    res.send({});
  });
};

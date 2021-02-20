import { Express } from "express";
import { body, validationResult } from "express-validator";
import { requireAuth } from "@js-alt-poll/common";

declare global {
  namespace Express {
    interface Request {
      // @ts-ignore
      user: User | undefined;
    }
  }
}

export const initPollRoutes = (app: Express) => {
  app.post("/polls", requireAuth, body("title").exists(), (req, res) => {
    const errs = validationResult(req);
    if (!errs.isEmpty()) {
      return res.status(400).json({ errors: errs.array() });
    } 
    console.log("req.user", req?.user);
    res.send({});
  });
};

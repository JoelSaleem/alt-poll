import { Express } from "express";
import { format } from "sqlstring";
import { body, validationResult } from "express-validator";
import { requireAuth, UserDbProps } from "@js-alt-poll/common";
import { pool } from "../db/dbConnection";
import { CREATE_POLL, GET_POLLS, GET_POLL } from "../db/queries";
import { logger } from "../logger";

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserDbProps;
    }
  }
}

export const initPollRoutes = (app: Express) => {
  app.get("/polls/:id", requireAuth, async (req, res) => {
    console.log(req.params);
    let polls = [];
    try {
      polls =
        (await pool.query(
          format(GET_POLL, [req.currentUser!.id, req.params.id])
        )) ?? [];
    } catch (e) {
      logger.error(e);
      return res.status(500).send();
    }

    res.send(polls);
  });

  app.get("/polls", requireAuth, async (req, res) => {
    let polls = [];
    try {
      polls =
        (await pool.query(format(GET_POLLS, [req.currentUser!.id]))) ?? [];
    } catch (e) {
      logger.error(e);
      return res.status(500).send();
    }

    res.send(polls);
  });

  app.post("/polls", requireAuth, body("title").exists(), async (req, res) => {
    const errs = validationResult(req);
    if (!errs.isEmpty()) {
      return res.status(400).json({ errors: errs.array() });
    }

    try {
      (await pool.query(
        format(CREATE_POLL, [
          req.body.title,
          req.body.description,
          req.currentUser!.id,
        ])
      )) ?? [];
    } catch (e) {
      logger.error(e);
      return res.status(500).send(e);
    }

    res.status(201).send({});
  });
};

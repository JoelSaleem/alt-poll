import { Express } from "express";
import { format } from "sqlstring";
import { body, validationResult } from "express-validator";
import { requireAuth, UserDbProps } from "@js-alt-poll/common";
import { pool } from "../db/dbConnection";
import { CREATE_POLL, GET_POLLS, GET_POLL } from "../db/queries";
import { logger } from "../logger";
import { pollProducer } from "../messaging/pollProducer";
import { buildUpdateQuery } from "../db/utils";

export const initPollRoutes = (app: Express) => {
  app.get("/polls/:id", requireAuth, async (req, res) => {
    console.log(req.params);
    let polls = [];
    try {
      polls =
        (
          await pool.query(
            format(GET_POLL, [req.currentUser!.id, req.params.id])
          )
        )?.rows ?? [];
    } catch (e) {
      logger.error(e);
      return res.sendStatus(500);
    }

    res.send(polls);
  });

  app.get("/polls", requireAuth, async (req, res) => {
    let polls = [];
    try {
      polls =
        (await pool.query(format(GET_POLLS, [req.currentUser!.id])))?.rows ??
        [];
    } catch (e) {
      logger.error(e);
      return res.status(500).send();
    }

    res.send(polls);
  });

  app.post(
    "/polls",
    requireAuth,
    body("title").exists().isString(),
    body("description").isString(),
    body("open").isBoolean(),
    body("closed").isBoolean(),
    async (req, res) => {
      const errs = validationResult(req);
      if (!errs.isEmpty()) {
        return res.status(400).json({ errors: errs.array() });
      }

      let poll;
      try {
        poll =
          (
            await pool.query(
              format(CREATE_POLL, [
                req.body.title,
                req.body.description,
                req.currentUser!.id,
              ])
            )
          )?.rows ?? [];

        console.log(poll);
        pollProducer.publish("poll.created", JSON.stringify(poll));
      } catch (e) {
        logger.error(e);
        return res.status(500).send(e);
      }

      res.status(201).send(poll?.[0]);
    }
  );

  app.put(
    "/polls/:id",
    requireAuth,
    body("title").isString(),
    body("description").isString().optional({ nullable: true }),
    body("open").isBoolean().optional({ nullable: true }),
    body("closed").isBoolean().optional({ nullable: true }),
    async (req, res) => {
      const errs = validationResult(req);
      if (!errs.isEmpty()) {
        return res.status(400).json({ errors: errs.array() });
      }

      const fields = ["title", "description", "closed", "open"];
      const command = buildUpdateQuery("Polls", fields, req.body, [
        "user_id",
        "id",
      ]);

      let poll;
      try {
        poll =
          (
            await pool.query(
              format(
                command,
                [
                  req.body.title,
                  req.body.description,
                  req.body.closed,
                  req.body.open,
                  req.currentUser!.id,
                  req.params!.id,
                ].filter((x) => x != null && x != undefined)
              )
            )
          )?.rows ?? [];

        console.log(poll);
        pollProducer.publish("poll.created", JSON.stringify(poll));
      } catch (e) {
        logger.error(e);
        return res.status(500).send(e);
      }

      res.status(201).send(poll?.[0]);
    }
  );
};

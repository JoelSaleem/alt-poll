import { Express } from "express";
import { format } from "sqlstring";
import { body, validationResult } from "express-validator";
import { requireAuth, PollEvents } from "@js-alt-poll/common";
import { pool } from "../db/dbConnection";
import { CREATE_POLL, GET_POLLS, GET_POLL } from "../db/queries";
import { logger } from "../logger";
import { pollProducer } from "../messaging/pollProducer";
import { buildUpdateQuery } from "../db/utils";
import { version } from "typescript";
import { Poll } from "../db/models/Poll";

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
    body("description").isString().optional({ nullable: true }),
    body("open").isBoolean().optional({ nullable: true }),
    body("closed").isBoolean().optional({ nullable: true }),
    async (req, res) => {
      const errs = validationResult(req);
      if (!errs.isEmpty()) {
        return res.status(400).json({ errors: errs.array() });
      }

      let poll;
      try {
        poll = (
          await pool.query(
            format(CREATE_POLL, [
              req.body.title,
              req.body.description,
              req.currentUser!.id,
            ])
          )
        )?.rows?.[0];

        pollProducer.publish(PollEvents.POLL_CREATED, JSON.stringify(poll));
      } catch (e) {
        logger.error(e);
        return res.status(500).send(e);
      }

      res.status(201).send(poll);
    }
  );

  app.put(
    "/polls/:id",
    requireAuth,
    body("title").isString().optional({ nullable: true }),
    body("description").isString().optional({ nullable: true }),
    body("open").isBoolean().optional({ nullable: true }),
    body("closed").isBoolean().optional({ nullable: true }),
    async (req, res) => {
      console.log("req.user", req.currentUser);
      const errs = validationResult(req);
      if (!errs.isEmpty()) {
        return res.status(400).json({ errors: errs.array() });
      }

      const { title, description, open, closed } = req.body as {
        title?: string;
        description?: string;
        open?: boolean;
        closed?: boolean;
      };

      let err = null;
      let status = 400;
      let poll;
      try {
        poll = await Poll.getById(req.params!.id, req.currentUser!.id);
        if (!poll) {
          throw new Error(`Could not find poll with id ${req.params!.pollId}`);
        }
        poll && poll.version++;
        if (title != null && title != undefined) {
          poll.title = title;
        }
        if (description != null && description != undefined) {
          poll.description = description;
        }
        if (open != null && open != undefined) {
          poll.open = open;
        }
        if (closed != null && closed != undefined) {
          poll.closed = closed;
        }

        await poll?.save();
      } catch (e) {
        err = e;
        status = 500;
      }

      if (err || !poll) {
        res.status(status).send(err);
      }

      pollProducer.publish(
        PollEvents.POLL_UPDATED,
        JSON.stringify(poll?.serialise())
      );
      res.send(poll?.serialise());
    }
  );
};

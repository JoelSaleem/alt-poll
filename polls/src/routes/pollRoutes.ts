import { Express } from "express";
import { format } from "sqlstring";
import { body, validationResult } from "express-validator";
import { requireAuth, UserDbProps } from "@js-alt-poll/common";
import { pool } from "../db/dbConnection";
import { CREATE_POLL, GET_POLLS, GET_POLL } from "../db/queries";
import { logger } from "../logger";
import { pollProducer } from "../messaging/pollProducer";

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
        (
          await pool.query(
            format(GET_POLL, [req.currentUser!.id, req.params.id])
          )
        )?.rows ?? [];
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
    body("description").isString(),
    body("open").isBoolean(),
    body("closed").isBoolean(),
    async (req, res) => {
      const errs = validationResult(req);
      if (!errs.isEmpty()) {
        return res.status(400).json({ errors: errs.array() });
      }

      console.log(req.body);

      const fields = ["title", "description", "closed", "open"];

      // Build update command
      let command = ['UPDATE "Polls"'];
      if (!fields.some((field) => field in req.body)) {
        return res
          .status(400)
          .send({ errors: ["You must provide some fields to update"] });
      } else {
        const updateFields = ["SET"];
        fields.forEach((field) => {
          if (field in req.body) {
            updateFields.push(`${field} = ?,`);
          }
        });

        // Remove trailing comma
        const finalUpdatePhrase = updateFields[updateFields.length - 1];
        updateFields[updateFields.length - 1] = finalUpdatePhrase.substring(
          0,
          finalUpdatePhrase.length - 1
        );

        command.push(updateFields.join(" "));
      }
      command.push("WHERE user_id = ? AND id = ?");
      command.push("RETURNING *");

      console.log(command.join("\n"));

      let poll;
      try {
        poll =
          (
            await pool.query(
              format(
                command.join("\n"),
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

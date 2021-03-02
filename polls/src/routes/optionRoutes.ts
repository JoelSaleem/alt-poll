import { requireAuth } from "@js-alt-poll/common";
import { Express, query } from "express";
import { body, validationResult } from "express-validator";
import { format } from "sqlstring";
import { pool } from "../db/dbConnection";
import { CREATE_OPTION, GET_OPTION, GET_OPTIONS } from "../db/queries";
import { logger } from "../logger";

export const initOptionRoutes = (app: Express) => {
  app.get("/polls/:pollId/options", requireAuth, async (req, res) => {
    const pollId = req.params.pollId;

    let options = [];
    try {
      options =
        (await pool.query(format(GET_OPTIONS, [req.currentUser!.id, pollId])))
          ?.rows ?? [];
    } catch (e) {
      logger.error(e);
      return res.sendStatus(500);
    }

    res.send(options);
  });

  app.get("/polls/:pollId/options/:optionId", requireAuth, async (req, res) => {
    const { pollId, optionId } = req.params;

    let option = null;
    try {
      option = (
        await pool.query(
          format(GET_OPTION, [req.currentUser!.id, pollId, optionId])
        )
      )?.rows?.[0];

      if (!option) {
        throw new Error(
          `Could not find poll with userId: ${
            req.currentUser!.id
          }, pollId: ${pollId}, optionId: ${optionId}`
        );
      }
    } catch (e) {
      logger.error(e);
      return res.send({ errors: ["Failed to fetch option"] });
    }

    res.send(option);
  });

  app.post(
    "/polls/:pollId/options",
    requireAuth,
    body("title").exists().isString(),
    body("description").isString().optional({ nullable: true }),
    async (req, res) => {
      const errs = validationResult(req);
      if (!errs.isEmpty()) {
        return res.status(400).json({ errors: errs.array() });
      }

      const { pollId } = req.params;
      const { title, description } = req.body;

      try {
        const option = (
          await pool.query(
            format(CREATE_OPTION, [
              title,
              description,
              pollId,
              req.currentUser!.id,
            ])
          )
        )?.rows?.[0];
        return res.send(option);
      } catch (e) {
        logger.error(e);
        res.status(500).send({ errors: ["Could not create option"] });
      }
    }
  );
};

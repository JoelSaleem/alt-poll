import { requireAuth } from "@js-alt-poll/common";
import { Express } from "express";
import { body, validationResult } from "express-validator";
import { format } from "sqlstring";
import { pool } from "../db/dbConnection";
import { GET_OPTIONS } from "../db/queries";
import { logger } from "../logger";
import { Option } from "../db/models/Option";

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
      option = await Option.getOptionById(
        optionId,
        pollId,
        req.currentUser!.id
      );

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

    res.send(option.serialise());
  });

  app.put(
    "/polls/:pollId/options/:optionId",
    requireAuth,
    body("title").exists().isString(),
    body("description").isString().optional({ nullable: true }),
    async (req, res) => {
      const errs = validationResult(req);
      if (!errs.isEmpty()) {
        return res.status(400).json({ errors: errs.array() });
      }

      const { pollId, optionId } = req.params as {
        pollId: string;
        optionId: string;
      };
      const { title, description } = req.body as {
        title: string;
        description: string | undefined;
      };

      try {
        let option = await Option.getOptionById(
          optionId,
          pollId,
          req.currentUser!.id
        );

        if (title) option.title = title;
        if (description) option.description = description;

        option = await option.save();

        res.send(option.serialise());
      } catch (e) {
        logger.error(e);
        return res
          .status(500)
          .send({ errors: [`Could not update option with Id: ${optionId}`] });
      }
    }
  );

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
        const option = await Option.create({
          title,
          description,
          pollId,
          userId: req.currentUser!.id,
        });
        return res.status(201).send(option.serialise());
      } catch (e) {
        logger.error(e);
        res.status(500).send({ errors: ["Could not create option"] });
      }
    }
  );
};

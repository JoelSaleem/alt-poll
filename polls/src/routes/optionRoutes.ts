import { OptionEvents, requireAuth } from "@js-alt-poll/common";
import { Express } from "express";
import { body, validationResult } from "express-validator";
import { format } from "sqlstring";
import { pool } from "../db/dbConnection";
import { GET_OPTIONS } from "../db/queries";
import { logger } from "../logger";
import { Option } from "../db/models/Option";
import { optionProducer } from "../messaging/optionProducer";
import { Poll } from "../db/models/Poll";

export const initOptionRoutes = (app: Express) => {
  app.get("/api/polls/:pollId/options", requireAuth, async (req, res) => {
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

  app.get(
    "/api/polls/:pollId/options/:optionId",
    requireAuth,
    async (req, res) => {
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
    }
  );

  app.put(
    "/api/polls/:pollId/options/:optionId",
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

        if (title != null) {
          option.title = title;
        }
        if (description != null) {
          option.description = description;
        }
        option.version++;

        option = await option.save();
        const serialisedOption = option.serialise();

        optionProducer.publish(
          OptionEvents.OPTION_UPDATED,
          JSON.stringify(serialisedOption)
        );

        res.send(serialisedOption);
      } catch (e) {
        logger.error(e);
        return res
          .status(500)
          .send({ errors: [`Could not update option with Id: ${optionId}`] });
      }
    }
  );

  app.post(
    "/api/polls/:pollId/options",
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
        const poll = await Poll.getById(pollId, req.currentUser!.id);
        if (!poll) {
          return res.status(400).send({
            errors: [
              `Could not create option. Reason: Could not find poll for id: ${pollId}`,
            ],
          });
        }
        if (poll.open) {
          return res.status(403).send({
            errors: [
              `Cannot add options after the poll is marked open for voting`,
            ],
          });
        }

        const option = await Option.create({
          title,
          description,
          pollId,
          userId: req.currentUser!.id,
          version: 0,
        });
        const serialisedOption = option.serialise();
        console.log("serialised", JSON.stringify(serialisedOption));

        optionProducer.publish(
          OptionEvents.OPTION_CREATED,
          JSON.stringify(serialisedOption)
        );

        return res.status(201).send(serialisedOption);
      } catch (e) {
        logger.error(e);
        res
          .status(500)
          .send({ errors: ["Could not create option. Reason: " + e] });
      }
    }
  );
};

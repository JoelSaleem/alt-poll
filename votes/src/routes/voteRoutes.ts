import { Express } from "express";
import { body, validationResult, query } from "express-validator";
import { requireAuth, VoteDBProps } from "@js-alt-poll/common";
import { pool } from "../db/dbConnection";
import { format } from "sqlstring";
import { GET_VOTES } from "../db/queries";
import { Vote } from "../db/models/Vote";

export const initVoteRoutes = (app: Express) => {
  app.get(
    "/api/votes",
    requireAuth,
    query("pollId").isString().exists(),
    async (req, res) => {
      const errs = validationResult(req);
      if (!errs.isEmpty()) {
        return res.status(400).json({ errors: errs.array() });
      }

      let votes: VoteDBProps[] = [];
      try {
        votes = ((
          await pool.query(
            format(GET_VOTES, [req.currentUser!.id, req.query.pollId])
          )
        )?.rows ?? []) as VoteDBProps[];
      } catch (e) {
        return res
          .status(500)
          .send({ errors: ["Could not get votes for poll"] });
      }

      res.send(votes);
    }
  );

  app.get("/api/votes/:voteId", requireAuth, async (req, res) => {
    const voteId = req.params.voteId;

    const vote = await Vote.getById(voteId, req.currentUser!.id);

    res.send(vote?.serialise());
  });

  app.put("/api/votes/:voteId", requireAuth, (req, res) => {
    // TODO
  });

  app.post(
    "/api/votes",
    requireAuth,
    body("optionId").isString().exists(),
    body("pollId").isString().exists(),
    body("rank").isNumeric().exists(),
    async (req, res) => {
      const vote = await Vote.create(
        req.currentUser!.id,
        req.body.pollId,
        req.body.optionId,
        req.body.rank
      );

      res.send(vote.serialise());
    }
  );
};

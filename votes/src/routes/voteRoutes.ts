import { Express } from "express";
import { body, validationResult } from "express-validator";
import { requireAuth, VoteDBProps } from "@js-alt-poll/common";
import { pool } from "../db/dbConnection";
import { format } from "sqlstring";
import { GET_VOTES } from "../db/queries";
import { Vote } from "../db/models/Votes";

export const initVoteRoutes = (app: Express) => {
  app.get(
    "/votes",
    // requireAuth,
    // body("pollId").isString().exists(),
    async (req, res) => {
      console.log(req.currentUser);
      // const errs = validationResult(req);
      // if (!errs.isEmpty()) {
      //   return res.status(400).json({ errors: errs.array() });
      // }

      // let votes: VoteDBProps[] = [];
      // try {
      //   votes = ((
      //     await pool.query(
      //       format(GET_VOTES, [req.currentUser!.id, req.body.pollId])
      //     )
      //   )?.rows ?? []) as VoteDBProps[];
      // } catch (e) {
      //   return res
      //     .status(500)
      //     .send({ errors: ["Could not get votes for poll"] });
      // }

      // res.send(votes);
      res.send({});
    }
  );

  app.get("/votes/:voteId", requireAuth, (req, res) => {
    res.send("init vote routes");
  });

  app.post(
    "/votes",
    requireAuth,
    body("optionId").isString().exists(),
    body("pollId").isString().exists(),
    body("rank").isNumeric().exists(),
    async (req, res) => {
      const vote = await Vote.create(
        req.body.userId,
        req.body.pollId,
        req.body.optionId,
        req.body.rank
      );

      res.send(vote.serialise());
    }
  );
};

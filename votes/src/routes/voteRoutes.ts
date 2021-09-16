import { Express } from "express";
import { body, validationResult, query } from "express-validator";
import { requireAuth, VoteDBProps } from "@js-alt-poll/common";
import { pool } from "../db/dbConnection";
import { format } from "sqlstring";
import { GET_OPTIONS_FROM_OTP, GET_VOTES, OptionFromOtp } from "../db/queries";
import { Otp } from "../db/models/Otp";
import { throwIfInvalidVotes, Vote as VoteType } from "./utils";
import { Vote as VoteModel } from "../db/models/Vote";

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

    const vote = await VoteModel.getById(voteId, req.currentUser!.id);

    res.send(vote?.serialise());
  });

  app.put("/api/votes/:voteId", requireAuth, (req, res) => {
    // TODO
  });

  app.post("/api/votes/:otpId", body("votes").exists(), async (req, res) => {
    const errs = validationResult(req);
    if (!errs.isEmpty()) {
      return res.status(400).json({ errors: errs.array() });
    }

    const otp = req.params?.otpId;
    if (!otp) {
      return res
        .status(403)
        .send({ errors: ["No one time password supplied"] });
    }

    const opts = (await pool.query(format(GET_OPTIONS_FROM_OTP, [otp])))
      ?.rows as OptionFromOtp[];

    if (!opts || opts.length == 0) {
      return res
        .status(400)
        .send({ errors: ["No poll or options exist for the otp " + otp] });
    }

    const votes = req.body.votes as VoteType[];
    try {
      throwIfInvalidVotes(votes, opts, otp);
    } catch (e) {
      return res
        .status(400)
        .send({ errors: [`${e}: received: ${JSON.stringify(votes)}`] });
    }

    // TODO: actually persist the vote

    res.send({});
  });
};

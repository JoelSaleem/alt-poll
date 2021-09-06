import { Express } from "express";
import { validationResult, query } from "express-validator";
import { VoteDBProps } from "@js-alt-poll/common";
import { pool } from "../db/dbConnection";
import { format } from "sqlstring";
import { GET_OPTIONS_FROM_OTP } from "../db/queries";

export const initOptionRoutes = (app: Express) => {
  app.get("/api/votes/options/:otpId", async (req, res) => {
    console.log(req.params);

    if (!req.params.otpId) {
      return res.status(400).send({ errors: ["invalid otp provided"] });
    }

    const otp: string = req.params!.otpId;

    let options: VoteDBProps[] = [];
    try {
      options = ((await pool.query(format(GET_OPTIONS_FROM_OTP, [otp])))
        ?.rows ?? []) as VoteDBProps[];
    } catch (e) {
      return res.status(500).send({ errors: [e] });
    }

    res.send(options);
  });
};

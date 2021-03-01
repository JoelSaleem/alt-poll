import { requireAuth } from "@js-alt-poll/common";
import { Express } from "express";
import { format } from "sqlstring";
import { pool } from "../db/dbConnection";
import { GET_OPTIONS } from "../db/queries";

export const initOptionRoutes = (app: Express) => {
  app.get("/polls/:pollId/options", requireAuth, async (req, res) => {
    console.log(req.params)
    const pollId = req.params.pollId;

    let options = [];
    try {
      options =
        (await pool.query(format(GET_OPTIONS, [req.currentUser!.id, pollId])))
          ?.rows ?? [];
    } catch (e) {}

    res.send(options);
  });

  app.get("/polls/:pollId/options/:optionId", (req, res) => {});
};

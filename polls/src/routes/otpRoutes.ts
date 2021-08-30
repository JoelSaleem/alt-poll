import { requireAuth } from "@js-alt-poll/common";
import { Express } from "express";
import { GET_OPTIONS } from "../db/queries";
import { logger } from "../logger";
import { Poll } from "../db/models/Poll";
import { Otp } from "../db/models/Otp";

export const initOtpRoutes = (app: Express) => {
  app.get("/api/polls/otp/:otpId", async (req, res) => {
    const { otpId } = req.params;

    try {
      const otp = await Otp.getById(otpId);

      if (!otp) {
        throw new Error(`Could not find otp with id ${otpId}`);
      }

      return res.send(otp.serialise());
    } catch (e) {
      logger.error(e);
      return res.send({ errors: ["Failed to fetch option"] });
    }
  });

  app.post("/api/polls/:pollId/otp/", requireAuth, async (req, res) => {
    const { pollId, otpId } = req.params;

    const poll = await Poll.getById(pollId, req.currentUser!.id);
    if (!poll) {
      return res
        .status(404)
        .send({ errors: [`No poll with id ${pollId} found`] });
    }

    try {
      const otp = await Otp.create(pollId, req.currentUser!.id);

      const serialisedOtp = otp.serialise();
      console.log("serialised", serialisedOtp);

      return res.status(201).send(serialisedOtp);
    } catch (e) {
      logger.error(e);
      res.status(500).send({ errors: ["Could not create otp"] });
    }
  });
};

import { BaseOtpModel, OtpDBProps } from "@js-alt-poll/common";
import { format } from "sqlstring";
import { pool } from "../dbConnection";
import { CREATE_POLL, GET_POLL } from "../queries";
import { buildUpdateQuery } from "../utils";

interface OtpModelProps {
  id: string;
  userId: string;
  expiry: string;
  pollId: string;
  createdAt: string;
  version: number;
}

export class Otp extends BaseOtpModel {
  constructor({
    id,
    userId,
    expiry,
    createdAt,
    pollId,
    version,
  }: OtpModelProps) {
    super(id, userId, expiry, pollId, createdAt, version);
  }

  // static getById = async (
  //   id: string,
  //   userId: string
  // ): Promise<Poll | undefined> => {
  //   const poll = (await pool.query(format(GET_POLL, [userId, id])))
  //     ?.rows?.[0] as PollDbProps;
  //   if (!poll) return;
  //   return new Poll();
  // };
  // static create = async (
  //   title: string,
  //   description: string,
  //   userId: string
  // ) => {
  //   const poll = (
  //     await pool.query(format(CREATE_POLL, [title, description, userId]))
  //   )?.rows?.[0] as PollDbProps;
  //   return new Poll();
  // };
  // save = async (): Promise<Poll> => {
  //   const q = buildUpdateQuery(
  //     "Polls",
  //     ["title", "description", "open", "closed", "version"],
  //     ["id", "user_id"]
  //   );
  //   await pool.query(
  //     format(q, [
  //       this.title,
  //       this.description,
  //       this.open,
  //       this.closed,
  //       this.version,
  //       this.id,
  //       this.userId,
  //     ])
  //   );
  //   return this;
  // };
}

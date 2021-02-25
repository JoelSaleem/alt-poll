import { BasePollModel, PollDbProps } from "@js-alt-poll/common";
import { format } from "sqlstring";
import { pool } from "../dbConnection";
import { CREATE_POLL } from "../queries";

export class Poll extends BasePollModel {
  constructor(
    id: string,
    title: string,
    userId: string,
    description: string = "",
    open: boolean = false,
    closed: boolean = false
  ) {
    super(id, title, userId, description, open, closed);
  }

  static create = async (
    title: string,
    description: string,
    userId: string
  ) => {
    const poll = (
      await pool.query(format(CREATE_POLL, [title, description, userId]))
    )?.rows;

    console.log("poll", poll);
    console.log("poll", poll?.[0]);
  };
}

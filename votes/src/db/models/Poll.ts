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
    id: string,
    title: string,
    description: string,
    userId: string,
    open: boolean = false,
    closed: boolean = false,
    createdAt: string
  ) => {
    const poll = (
      await pool.query(
        format(CREATE_POLL, [
          id,
          title,
          description,
          userId,
          open,
          closed,
          createdAt,
        ])
      )
    )?.rows?.[0];

    return poll;
  };
}

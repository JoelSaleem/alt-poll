import { BasePollModel, PollDbProps } from "@js-alt-poll/common";
import { format } from "sqlstring";
import { version } from "typescript";
import { pool } from "../dbConnection";
import { CREATE_POLL, GET_POLL } from "../queries";
import { buildUpdateQuery } from "../utils";

export class Poll extends BasePollModel {
  constructor(
    id: string,
    title: string,
    userId: string,
    description: string = "",
    open: boolean = false,
    closed: boolean = false,
    version: number = 0,
    createdAt: Date | null = null
  ) {
    super(id, title, userId, description, open, closed, undefined, version);
  }

  static getById = async (
    id: string,
    userId: string
  ): Promise<Poll | undefined> => {
    const poll = (await pool.query(format(GET_POLL, [userId, id])))
      ?.rows?.[0] as PollDbProps;

    if (!poll) return;

    return new Poll(
      poll.id,
      poll.title,
      poll.user_id,
      poll.description,
      poll.open,
      poll.closed,
      poll.version,
      new Date(poll.created_at)
    );
  };

  static create = async (
    title: string,
    description: string,
    userId: string
  ) => {
    const poll = (
      await pool.query(format(CREATE_POLL, [title, description, userId]))
    )?.rows?.[0] as PollDbProps;

    return new Poll(
      poll.id,
      poll.title,
      poll.user_id,
      poll.description,
      poll.open,
      poll.closed,
      poll.version,
      new Date(poll.created_at)
    );
  };

  save = async (): Promise<Poll> => {
    const q = buildUpdateQuery(
      "Polls",
      ["title", "description", "open", "closed", "version"],
      ["id", "user_id"]
    );
    await pool.query(
      format(q, [
        this.title,
        this.description,
        this.open,
        this.closed,
        this.version,
        this.id,
        this.userId,
      ])
    );
    return this;
  };
}

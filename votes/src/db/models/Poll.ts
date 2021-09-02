import { BasePollModel, PollDbProps } from "@js-alt-poll/common";
import { format } from "sqlstring";
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
    createdAt: Date = new Date(),
    version: number = 0
  ) {
    super(
      id,
      title,
      userId,
      description,
      open,
      closed,
      createdAt.toISOString(),
      version
    );
  }

  static create = async (
    id: string,
    title: string,
    description: string,
    userId: string,
    open: boolean = false,
    closed: boolean = false,
    createdAt: string,
    version: number = 0
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

  static getById = async (id: string, userId: string) => {
    const pollData: PollDbProps | undefined = (
      await pool.query(format(GET_POLL, [userId, id]))
    )?.rows?.[0];

    if (!pollData) return;

    const { open, closed, description, title, created_at } = pollData;

    return new Poll(
      id,
      title,
      userId,
      description,
      open,
      closed,
      new Date(created_at)
    );
  };

  save = async () => {
    const {
      title,
      open,
      closed,
      description,
      id,
      user_id,
      version,
    } = this.serialise();
    const q = buildUpdateQuery(
      "Polls",
      ["title", "description", "open", "closed", "version"],
      ["id", "user_id"]
    );
    console.log("query", q);
    console.log(
      "formatted",
      format(q, [title, description, open, closed, version, id, user_id])
    );

    await pool.query(
      format(q, [title, description, open, closed, version, id, user_id])
    );
  };
}

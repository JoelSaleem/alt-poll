import {
  BaseOptionModel,
  OptionDbProps,
  OptionModelProps,
} from "@js-alt-poll/common";
import { format } from "sqlstring";
import { pool } from "../dbConnection";
import { CREATE_OPTION, GET_OPTION } from "../queries";
import { buildUpdateQuery } from "../utils";

export class Option extends BaseOptionModel {
  constructor(optionData: OptionModelProps) {
    super(optionData);
  }

  static create = async ({
    title,
    description,
    pollId,
    userId,
  }: Omit<OptionModelProps, "id" | "createdAt">): Promise<Option> => {
    const option = (
      await pool.query(
        format(CREATE_OPTION, [title, description, pollId, userId])
      )
    )?.rows?.[0] as OptionDbProps;

    return new Option({
      id: option.id,
      description: option.description,
      title: option.title,
      createdAt: new Date(option.created_at),
      pollId: option.poll_id,
      userId: option.user_id,
    });
  };

  static getOptionById = async (
    id: string,
    pollId: string,
    userId: string
  ): Promise<Option> => {
    const option = (await pool.query(format(GET_OPTION, [userId, pollId, id])))
      ?.rows?.[0] as OptionDbProps;

    return new Option({
      id: option.id,
      title: option.title,
      description: option.description,
      pollId: option.poll_id,
      userId: option.user_id,
      createdAt: new Date(option.created_at),
    });
  };

  save = async (): Promise<Option> => {
    const command = buildUpdateQuery(
      "Options",
      ["title", "description"],
      ["user_id", "poll_id", "id"]
    );

    const { id, description, poll_id, title, user_id } = (
      await pool.query(
        format(command, [
          this.title,
          this.description,
          this.userId,
          this.pollId,
          this.id,
        ])
      )
    )?.rows?.[0] as OptionDbProps;

    this.id = id;
    this.description = description;
    this.pollId = poll_id;
    this.title = title;
    this.userId = user_id;

    return this;
  };
}

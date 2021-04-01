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
    id,
    createdAt,
    title,
    description,
    pollId,
    userId,
  }: OptionModelProps): Promise<Option> => {
    const option = (
      await pool.query(
        format(CREATE_OPTION, [
          id,
          createdAt.toISOString(),
          title,
          description,
          pollId,
          userId,
        ])
      )
    )?.rows?.[0] as OptionDbProps;

    return new Option({
      id: option.id,
      description: option.description,
      title: option.title,
      createdAt: new Date(option.created_at),
      pollId: option.poll_id,
      userId: option.user_id,
      version: option.version,
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
      version: option.version,
    });
  };

  save = async (): Promise<Option> => {
    const command = buildUpdateQuery(
      "Options",
      ["title", "description", "version"],
      ["user_id", "poll_id", "id"]
    );

    const opts = await pool.query(
      format(command, [
        this.title,
        this.description,
        this.version,
        this.userId,
        this.pollId,
        this.id,
      ])
    );
    const opt = opts?.rows?.[0];
    console.log(opt);
    const { id, description, poll_id, title, user_id, version } = opt;

    this.id = id;
    this.description = description;
    this.pollId = poll_id;
    this.title = title;
    this.userId = user_id;
    this.version = version

    return this;
  };
}

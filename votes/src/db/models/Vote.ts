import cuid from "cuid";
import { BaseVoteModel, VoteDBProps } from "@js-alt-poll/common";
import { format } from "sqlstring";
import { pool } from "../dbConnection";
import { CREATE_VOTE, GET_VOTE } from "../queries";

export class Vote extends BaseVoteModel {
  constructor(id: string, optionId: string, rank: number, createdAt?: Date) {
    super(id, optionId, rank, (createdAt || new Date()).toISOString());
  }

  static getById = async (id: string) => {
    console.log("quer", format(GET_VOTE, [id]));
    const voteData: VoteDBProps | undefined = (
      await pool.query(format(GET_VOTE, [id]))
    )?.rows?.[0];

    if (!voteData) return;

    const { created_at, option_id, rank } = voteData;

    return new Vote(id, option_id, rank, new Date(created_at));
  };

  static create = async (
    optionId: string,
    rank: number
  ): Promise<Vote> => {
    const vote = (
      await pool.query(format(CREATE_VOTE, [optionId, rank]))
    )?.rows?.[0] as VoteDBProps;

    return new Vote(vote.id, optionId, rank);
  };
}

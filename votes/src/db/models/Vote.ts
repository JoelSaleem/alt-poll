import { BaseVoteModel, VoteDBProps } from "@js-alt-poll/common";
import { format } from "sqlstring";
import { pool } from "../dbConnection";
import { CREATE_VOTE, GET_VOTE } from "../queries";

export class Vote extends BaseVoteModel {
  constructor(
    id: string,
    userId: string,
    optionId: string,
    pollId: string,
    rank: number,
    createdAt?: string,
    version: number = 0
  ) {
    super(id, userId, optionId, pollId, rank, createdAt, version);
  }

  static getById = async (id: string, userId: string) => {
    console.log("quer", format(GET_VOTE, [userId, id]));
    const voteData: VoteDBProps | undefined = (
      await pool.query(format(GET_VOTE, [userId, id]))
    )?.rows?.[0];

    if (!voteData) return;

    const { user_id, created_at, option_id, poll_id, rank, version } = voteData;

    return new Vote(id, user_id, option_id, poll_id, rank, created_at, version);
  };

  static create = async (
    userId: string,
    pollId: string,
    optionId: string,
    rank: number
  ): Promise<Vote> => {
    const vote = (
      await pool.query(format(CREATE_VOTE, [userId, pollId, optionId, rank]))
    )?.rows?.[0] as VoteDBProps;

    return new Vote(
      vote.id,
      vote.user_id,
      vote.option_id,
      vote.poll_id,
      vote.rank,
      vote.created_at
    );
  };
}

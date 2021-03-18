import { BaseVoteModel, VoteDBProps } from "@js-alt-poll/common";
import { format } from "sqlstring";
import { pool } from "../dbConnection";
import { CREATE_VOTE } from "../queries";

export class Vote extends BaseVoteModel {
  constructor(
    id: string,
    userId: string,
    optionId: string,
    pollId: string,
    rank: number,
    createdAt?: string
  ) {
    super(id, userId, optionId, pollId, rank, createdAt);
  }

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

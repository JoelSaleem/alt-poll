export interface VoteDBProps {
  id: string;
  user_id: string;
  option_id: string;
  poll_id: string;
  created_at: string;
  rank: number;
}

export class BaseVoteModel {
  public id: string;
  public userId: string;
  public optionId: string;
  public pollId: string;
  public createdAt: Date;
  public rank: number;

  constructor(
    id: string,
    userId: string,
    optionId: string,
    pollId: string,
    rank: number,
    createdAt: string | null = null
  ) {
    this.id = id;
    this.userId = userId;
    this.optionId = optionId;
    this.pollId = pollId;
    this.rank = rank;
    this.createdAt = (createdAt && new Date(createdAt)) || new Date();
  }

  serialise = (): VoteDBProps => ({
    id: this.id,
    user_id: this.userId,
    option_id: this.optionId,
    poll_id: this.pollId,
    rank: this.rank,
    created_at: this.createdAt.toISOString(),
  });
}

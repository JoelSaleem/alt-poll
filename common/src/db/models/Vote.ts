export interface VoteDBProps {
  id: string;
  option_id: string;
  created_at: string;
  rank: number;
  voter_id: string;
}

export class BaseVoteModel {
  public id: string;
  public optionId: string;
  public createdAt: Date;
  public rank: number;
  public voterId: string;

  constructor(
    id: string,
    optionId: string,
    rank: number,
    voterId: string,
    createdAt: string | null = null
  ) {
    this.id = id;
    this.optionId = optionId;
    this.rank = rank;
    this.createdAt = (createdAt && new Date(createdAt)) || new Date();
    this.voterId = voterId;
  }

  serialise = (): VoteDBProps => ({
    id: this.id,
    option_id: this.optionId,
    rank: this.rank,
    created_at: this.createdAt.toISOString(),
    voter_id: this.voterId,
  });
}

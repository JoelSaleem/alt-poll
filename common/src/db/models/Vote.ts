export interface VoteDBProps {
  id: string;
  option_id: string;
  created_at: string;
  rank: number;
}

export class BaseVoteModel {
  public id: string;
  public optionId: string;
  public createdAt: Date;
  public rank: number;

  constructor(
    id: string,
    optionId: string,
    rank: number,
    createdAt: string | null = null
  ) {
    this.id = id;
    this.optionId = optionId;
    this.rank = rank;
    this.createdAt = (createdAt && new Date(createdAt)) || new Date();
  }

  serialise = (): VoteDBProps => ({
    id: this.id,
    option_id: this.optionId,
    rank: this.rank,
    created_at: this.createdAt.toISOString(),
  });
}

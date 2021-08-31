export interface OtpDBProps {
  id: string;
  expired: boolean;
  created_at: string;
  poll_id: string;
  user_id: string;
  version: number;
}

export class BaseOtpModel {
  public id: string;
  public expired: boolean;
  public createdAt: Date;
  public pollId: string;
  public userId: string;
  public version: number;

  constructor(
    id: string,
    userId: string,
    expired: boolean,
    pollId: string,
    createdAt: string | null = null,
    version: number = 0
  ) {
    this.id = id;
    this.userId = userId;
    this.pollId = pollId;
    this.createdAt = (createdAt && new Date(createdAt)) || new Date();
    this.version = version;
    this.expired = expired;
  }

  serialise = (): OtpDBProps => ({
    id: this.id,
    user_id: this.userId,
    poll_id: this.pollId,
    created_at: this.createdAt.toISOString(),
    expired: this.expired,
    version: this.version,
  });
}

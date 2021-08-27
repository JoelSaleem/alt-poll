export interface OtpDBProps {
  id: string;
  expiry: string;
  created_at: string;
  poll_id: string;
  user_id: string;
  version: number;
}

export class BaseOtpModel {
  public id: string;
  public expiry: Date;
  public createdAt: Date;
  public pollId: string;
  public userId: string;
  public version: number;

  constructor(
    id: string,
    userId: string,
    expiry: string,
    pollId: string,
    createdAt: string | null = null,
    version: number = 0
  ) {
    this.id = id;
    this.userId = userId;
    this.pollId = pollId;
    this.createdAt = (createdAt && new Date(createdAt)) || new Date();
    this.version = version;
    this.expiry = new Date(expiry);
  }

  serialise = (): OtpDBProps => ({
    id: this.id,
    user_id: this.userId,
    poll_id: this.pollId,
    created_at: this.createdAt.toISOString(),
    expiry: this.expiry.toISOString(),
    version: this.version,
  });
}

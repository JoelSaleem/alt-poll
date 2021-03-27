export interface OptionDbProps {
  id: string;
  title: string;
  description: string;
  poll_id: string;
  created_at: string;
  user_id: string;
  version: number;
}

export interface OptionModelProps {
  id: string;
  title: string;
  description: string;
  pollId: string;
  createdAt: Date;
  userId: string;
  version: number;
}

export class BaseOptionModel implements OptionModelProps {
  public id: string;
  public title: string;
  public description: string;
  public pollId: string;
  public createdAt: Date;
  public userId: string;
  public version: number;

  constructor({
    id,
    title,
    description,
    pollId,
    createdAt,
    userId,
    version = 0,
  }: OptionModelProps) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.userId = userId;
    this.pollId = pollId;
    this.createdAt = (createdAt && new Date(createdAt)) || new Date();
    this.version = version;
  }

  serialise = (): OptionDbProps => ({
    id: this.id,
    title: this.title,
    description: this.description,
    poll_id: this.pollId,
    user_id: this.userId,
    created_at: this.createdAt.toISOString(),
    version: this.version,
  });
}

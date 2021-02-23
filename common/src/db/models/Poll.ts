export interface PollDbProps {
  id: string;
  title: string;
  description: string;
  user_id: string;
  created_at: string;
  closed: boolean;
  open: boolean;
}

export class BasePollModel {
  public id: string;
  public title: string;
  public description: string;
  public userId: string;
  public createdAt: Date;
  public closed: boolean;
  public open: boolean;

  constructor(
    id: string,
    title: string,
    userId: string,
    description: string = "",
    open: boolean = false,
    closed: boolean = false,
    createdAt: string | null = null
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.userId = userId;
    this.open = open;
    this.closed = closed;
    this.createdAt = (createdAt && new Date(createdAt)) || new Date();
  }

  serialise = (): PollDbProps => ({
    id: this.id,
    closed: this.closed,
    open: this.open,
    description: this.description,
    user_id: this.userId,
    title: this.title,
    created_at: this.createdAt.toISOString(),
  });
}

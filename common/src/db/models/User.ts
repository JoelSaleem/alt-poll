export interface UserDbProps {
  name: string;
  google_id: string;
  id: string;
  created_at: string;
}

export class BaseUserModel {
  public name: string;
  public googleId: string;
  public id: string;
  public createdAt: Date;

  constructor(id: string, googleId: string, name: string, createdAt: string) {
    this.id = id;
    this.googleId = googleId;
    this.name = name;
    this.createdAt = new Date(createdAt);
  }

  serialise = (): UserDbProps => ({
    id: this.id,
    google_id: this.googleId,
    name: this.name,
    created_at: this.createdAt.toISOString(),
  });
}

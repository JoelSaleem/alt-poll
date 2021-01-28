import { query } from "../db/executeQuery";
import { 
  CREATE_USER,
  GET_USER_BY_GOOGLE_ID,
  GET_USER_BY_ID,
} from "../db/queries";
import { logger } from "../logger";

export interface UserDbProps {
  name: string;
  google_id: string;
  id: string;
  created_at: string;
}

export class User {
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

  static getUserById = async (id: string) => {
    let user: UserDbProps | undefined;
    let err;
    try {
      user = (await query(GET_USER_BY_ID, [id]))?.[0];
    } catch (e) {
      err = e;
      logger.error(e); 
    }
    if (err) {
      throw new Error(err);
    }

    if (user) {
      return new User(user.id, user.google_id, user.name, user.created_at);
    }
  };

  static getUserByGoogleId = async (googleId: string) => {
    let user: UserDbProps | undefined;
    let err;
    try {
      user = (await query(GET_USER_BY_GOOGLE_ID, [googleId]))?.[0];
    } catch (e) {
      err = e;
      logger.error(e);
    }
    if (err) {
      throw new Error(err);
    }

    if (user) {
      return new User(user.id, user.google_id, user.name, user.created_at);
    }
  };

  static createUser = async (name: string, googleId: string) => {
    let user: User | undefined;
    let err;

    try {
      await query(CREATE_USER, [name, googleId]);
      user = await User.getUserByGoogleId(googleId);
      logger.info("created user " + JSON.stringify(user));
    } catch (e) {
      err = e;
    }

    if (err) {
      logger.error(err);
      throw new Error(err);
    }

    return user;
  };
}

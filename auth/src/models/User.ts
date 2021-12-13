import { BaseUserModel } from "@js-alt-poll/common";
import { pool } from "../db/dbConnection";
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

export class User extends BaseUserModel {
  constructor(id: string, googleId: string, name: string, createdAt: string) {
    super(id, googleId, name, createdAt);
  }

  static getUserById = async (id: string) => {
    let user: UserDbProps | undefined;
    let err;
    try {
      user = (await pool.query(GET_USER_BY_ID, [id]))?.rows?.[0];
    } catch (e) {
      err = e;
      logger.error(e);
    }
    if (err) {
      throw new Error(err as string);
    }

    if (user) {
      return new User(user.id, user.google_id, user.name, user.created_at);
    }
  };

  static getUserByGoogleId = async (googleId: string) => {
    let user: UserDbProps | undefined;
    let err;
    try {
      user = (await pool.query(GET_USER_BY_GOOGLE_ID, [googleId]))?.rows?.[0];
    } catch (e) {
      err = e;
      logger.error(e);
    }
    if (err) {
      throw new Error(err as string);
    }

    if (user) {
      return new User(user.id, user.google_id, user.name, user.created_at);
    }
  };

  static createUser = async (name: string, googleId: string) => {
    let user: User | undefined;
    let err;

    try {
      await pool.query(CREATE_USER, [name, googleId]);
      user = await User.getUserByGoogleId(googleId);
      logger.info("created user " + JSON.stringify(user));
    } catch (e) {
      err = e;
    }

    if (err) {
      logger.error(err);
      throw new Error(err as string);
    }

    return user;
  };
}

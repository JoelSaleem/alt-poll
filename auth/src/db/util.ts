import { logger } from "../logger";
import { query } from "./executeQuery";
import { CREATE_USER, GET_USER_BY_GOOGLE_ID, GET_USER_BY_ID } from "./queries";

export const getUserById = async (id: string) => {
  let user;
  let err;
  try {
    user = await query(GET_USER_BY_ID, [id]);
  } catch (e) {
    err = e;
    logger.error(e);
  }
  if (err) {
    throw new Error(err);
  }

  return user?.[0];
};

export const getUserByGoogleId = async (googleId: string) => {
  let user;
  let err;
  try {
    user = await query(GET_USER_BY_GOOGLE_ID, [googleId]);
  } catch (e) {
    err = e;
    logger.error(e);
  }
  if (err) {
    throw new Error(err);
  }

  return user?.[0];
};

export const createUser = async (name: string, googleId: string) => {
  let user;
  let err;

  try {
    await query(CREATE_USER, [name, googleId]);
    user = await getUserByGoogleId(googleId);
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

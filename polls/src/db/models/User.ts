import { BaseUserModel, UserDbProps } from "@js-alt-poll/common";
import { GET_USER_BY_ID, CREATE_USER } from "../queries";
import { pool } from "../dbConnection";

export class User extends BaseUserModel {
  static getUserById = async (id: string): Promise<User | undefined> => {
    const users = (await pool.query(GET_USER_BY_ID, [id])) as UserDbProps[];

    if ((users?.length ?? 0) >= 1) {
      const u = users?.[0];
      return new User(u.id, u.google_id, u.name, u.created_at);
    }
  };

  getMissingParams = (): string[] => {
    const isMissingId = !this.id;
    const isMissingGoogleId = !this.googleId;
    const isMissingName = !this.name;

    const missingParams = [];

    if (isMissingId) {
      missingParams.push("id");
    }

    if (isMissingGoogleId) {
      missingParams.push("google_id");
    }

    if (isMissingName) {
      missingParams.push("name");
    }

    return missingParams;
  };

  save = async (): Promise<User> => {
    const missingParams = this.getMissingParams();
    if (missingParams.length) {
      throw new Error(
        `Could not create user: ${JSON.stringify(this.serialise())}. ` +
          `Missing the params: ${missingParams.join(", ")}`
      );
    }

    const { id, name, google_id, created_at } = this.serialise();

    await pool.query(CREATE_USER, [id, name, google_id, created_at]);

    return this;
  };
}

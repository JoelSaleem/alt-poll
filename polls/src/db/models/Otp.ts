import cuid from "cuid";
import { BaseOtpModel, OtpDBProps } from "@js-alt-poll/common";
import { format } from "sqlstring";
import { pool } from "../dbConnection";
import { CREATE_OTP, GET_OTP_BY_VALUE } from "../queries";
import { buildUpdateQuery } from "../utils";

interface OtpModelProps {
  id: string;
  userId: string;
  expiry: string;
  pollId: string;
  createdAt: string;
  version: number;
}

export class Otp extends BaseOtpModel {
  constructor({
    id,
    userId,
    expiry,
    createdAt,
    pollId,
    version,
  }: OtpModelProps) {
    super(id, userId, expiry, pollId, createdAt, version);
  }

  static getById = async (id: string): Promise<Otp | undefined> => {
    console.log(format(GET_OTP_BY_VALUE, [id]))
    const otp = (await pool.query(format(GET_OTP_BY_VALUE, [id])))
      ?.rows?.[0] as OtpDBProps;

    if (!otp) return;
    return new Otp({
      id: otp.id,
      createdAt: otp.created_at,
      expiry: otp.expiry,
      pollId: otp.poll_id,
      userId: otp.user_id,
      version: otp.version,
    });
  };

  static create = async (pollId: string, userId: string) => {
    const expiry = Date.now() + 1 * 1000 * 60 * 30; // 30 mins
    const otp = (
      await pool.query(
        format(CREATE_OTP, [
          cuid(),
          new Date(expiry).toISOString(),
          pollId,
          userId,
          0,
        ])
      )
    )?.rows?.[0] as OtpDBProps;

    return new Otp({
      id: otp.id,
      createdAt: otp.created_at,
      expiry: otp.expiry,
      pollId: otp.poll_id,
      userId: otp.user_id,
      version: otp.version,
    });
  };

  // Would we ever update an otp??
  // What about to refresh expiry?

  // save = async (): Promise<Otp> => {
  //   const q = buildUpdateQuery(
  //     "Otps",
  //     ["title", "description", "open", "closed", "version"],
  //     ["id", "user_id"]
  //   );
  //   await pool.query(
  //     format(q, [
  //       this.title,
  //       this.description,
  //       this.open,
  //       this.closed,
  //       this.version,
  //       this.id,
  //       this.userId,
  //     ])
  //   );
  //   return this;
  // };
}

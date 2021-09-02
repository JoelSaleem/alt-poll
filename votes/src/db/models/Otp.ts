import cuid from "cuid";
import { BaseOtpModel, OtpDBProps } from "@js-alt-poll/common";
import { format } from "sqlstring";
import { pool } from "../dbConnection";
import { CREATE_OTP, GET_OTP_BY_VALUE } from "../queries";
import { buildUpdateQuery } from "../utils";

interface OtpModelProps {
  id: string;
  userId: string;
  expired: boolean;
  pollId: string;
  createdAt: string;
  version: number;
}

export class Otp extends BaseOtpModel {
  constructor({
    id,
    userId,
    expired,
    createdAt,
    pollId,
    version,
  }: OtpModelProps) {
    super(id, userId, expired, pollId, createdAt, version);
  }

  static getById = async (id: string): Promise<Otp | undefined> => {
    const result = await pool.query(format(GET_OTP_BY_VALUE, [id]));
    const otp = (await pool.query(format(GET_OTP_BY_VALUE, [id])))
      ?.rows?.[0] as OtpDBProps & { otp_id: string };

    if (!otp) return;
    return new Otp({
      id: otp.otp_id,
      createdAt: otp.created_at,
      expired: otp.expired,
      pollId: otp.poll_id,
      userId: otp.user_id,
      version: otp.version,
    });
  };

  static create = async (pollId: string, userId: string) => {
    console.log(format(CREATE_OTP, [cuid(), false, pollId, userId, 0]))
    const otp = (
      await pool.query(format(CREATE_OTP, [cuid(), false, pollId, userId, 0]))
    )?.rows?.[0] as OtpDBProps;

    return new Otp({
      id: otp.id,
      createdAt: otp.created_at,
      expired: otp.expired,
      pollId: otp.poll_id,
      userId: otp.user_id,
      version: otp.version,
    });
  };

  expire = async () => {
    const q = buildUpdateQuery("Otps", ["expired"], ["id"]);

    const res = await pool.query(format(q, [true, this.id]));

    this.expired = true;

    return this;
  };

  // Would we ever update an otp??
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

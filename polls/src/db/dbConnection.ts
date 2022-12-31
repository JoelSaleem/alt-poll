import { PgPool } from "@js-alt-poll/common";

if (!process.env.DB_PASSWORD) {
  throw new Error("No db secret found");
}

export const pool = new PgPool({
  user: process.env.PG_USER?.trim() as string,
  password: process.env.DB_PASSWORD?.trim(),
  host: process.env.PG_HOST?.trim() as string,
  port: Number(process.env.PG_PORT),
  database: "polls",
});

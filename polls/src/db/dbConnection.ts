import { PgPool } from "@js-alt-poll/common";

if (!process.env.DB_PASSWORD) {
  throw new Error("No db secret found");
}

export const pool = new PgPool({
  user: "postgres",
  password: process.env.DB_PASSWORD?.trim(),
  host: "alt-poll-polls-db.default.svc.cluster.local",
  port: 5432,
  database: "polls",
});

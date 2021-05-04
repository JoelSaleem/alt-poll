import { Client, QueryResult } from "pg";
import { logger } from "./logger";

const client = new Client({
  user: "postgres",
  password: "foobar",
  host: "alt-poll-auth.default.svc.cluster.local",
  port: 5432,
  database: "auth",
});

export const execute = async (query: string, params: string[]) => {
  let results: QueryResult | undefined;

  try {
    await client.connect();
    results = await client.query(query, params);
  } catch (err) {
    logger.error(err);
  } finally {
    await client.end();
  }
  return results?.rows;
};

import { Pool, PoolClient, QueryResult } from "pg";
import { logger } from "./logger";

export const query = async (query: string, params: string[]) => {
  const pool = new Pool({
    user: "postgres",
    password: "foobar",
    host: "alt-poll-auth.default.svc.cluster.local",
    port: 5432,
    database: "auth",
  });
  let results: QueryResult | undefined;

  let client: PoolClient | null = null;
  try {
    client = await pool.connect();
    console.log('QUERY ', query)
    console.log('PARAMS ', params)
    results = await client.query(query, params);
    console.log('RESULTS ', results)
  } catch (err) {
    logger.error(err);
  } finally {
    client?.release();
  }
  return results?.rows;
};

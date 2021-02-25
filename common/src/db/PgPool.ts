import { Pool, PoolClient, QueryResult } from "pg";

export interface PgPoolConfig {
  user: string;
  password: string;
  host: string;
  port: number;
  database: string;
}

export class PgPool {
  private pool: Pool;

  constructor(config: PgPoolConfig) {
    this.pool = new Pool({
      user: config.user,
      password: config.password,
      host: config.host,
      port: config.port,
      database: config.database,
    });
  }

  query = async (query: string, params: string[] = []) => {
    let results: QueryResult | undefined;

    let client: PoolClient | null = null;
    let error: any;
    try {
      client = await this.pool.connect();
      results = await client.query(query, params);
    } catch (err) {
      error = err;
    } finally {
      client?.release();
    }

    if (error) {
      throw error;
    }

    return results
  };
}

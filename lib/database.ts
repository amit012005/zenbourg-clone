import { Pool, type PoolClient } from "pg"

// Database connection pool
let pool: Pool | null = null

export function getPool(): Pool {
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    })

    // Handle pool errors
    pool.on("error", (err) => {
      console.error("Unexpected error on idle client", err)
      process.exit(-1)
    })
  }

  return pool
}

// Database query helper
export async function query(text: string, params?: any[]): Promise<any> {
  const pool = getPool()
  const start = Date.now()

  try {
    const res = await pool.query(text, params)
    const duration = Date.now() - start

    if (process.env.NODE_ENV === "development") {
      console.log("Executed query", { text, duration, rows: res.rowCount })
    }

    return res
  } catch (error) {
    console.error("Database query error:", error)
    throw error
  }
}

// Transaction helper
export async function withTransaction<T>(callback: (client: PoolClient) => Promise<T>): Promise<T> {
  const pool = getPool()
  const client = await pool.connect()

  try {
    await client.query("BEGIN")
    const result = await callback(client)
    await client.query("COMMIT")
    return result
  } catch (error) {
    await client.query("ROLLBACK")
    throw error
  } finally {
    client.release()
  }
}

// Health check
export async function checkDatabaseConnection(): Promise<boolean> {
  try {
    const result = await query("SELECT NOW()")
    return !!result
  } catch (error) {
    console.error("Database connection failed:", error)
    return false
  }
}

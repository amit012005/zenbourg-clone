const { Pool } = require("pg")
require("dotenv").config() // To load DATABASE_URL from .env

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false, // Adjust SSL for production if needed
})

pool.on("connect", () => {
  console.log("Connected to the PostgreSQL database!")
})

pool.on("error", (err) => {
  console.error("Unexpected error on idle client", err)
  process.exit(-1)
})

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool, // Export pool if direct access is needed
}

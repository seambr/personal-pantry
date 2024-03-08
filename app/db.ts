import pg from "pg"

const { Pool } = pg

// TODO: REPLACE DUMMY DATA WITH REAL USING .env.local
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "mysecretpassword",
  port: 5432,
})

module.exports = pool

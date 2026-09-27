import { Pool, types } from 'pg'
import dotenv from 'dotenv'
dotenv.config()

types.setTypeParser(1700, (val: string) => parseFloat(val))

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL
})

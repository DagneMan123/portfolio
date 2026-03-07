import { Pool } from 'pg'
import dotenv from 'dotenv'
import path from 'path'

// Load .env from backend directory
dotenv.config({ path: path.resolve(process.cwd(), '.env') })

const dbPassword = process.env.DB_PASSWORD
if (!dbPassword) {
  console.error('ERROR: DB_PASSWORD is not set in .env file')
  console.error('Available env vars:', Object.keys(process.env).filter(k => k.includes('DB')))
}

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '6543'),
  database: process.env.DB_NAME || 'postgres',
  user: process.env.DB_USER || 'postgres',
  password: dbPassword || '',
})

pool.on('error', (err: Error) => {
  console.error('Unexpected error on idle client', err)
})

export default pool

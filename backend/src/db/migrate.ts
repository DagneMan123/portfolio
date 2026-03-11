import pool from '../config/database.js'

async function migrate() {
  try {
    console.log('Running migrations...')

    // Create testimonials table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS testimonials (
        id SERIAL PRIMARY KEY,
        project_id INTEGER,
        author_name VARCHAR(255) NOT NULL,
        author_title VARCHAR(255) NOT NULL,
        quote TEXT NOT NULL,
        image_url TEXT,
        is_approved BOOLEAN DEFAULT false,
        edit_token VARCHAR(255) UNIQUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // Add project_id column if it doesn't exist
    try {
      await pool.query(`
        ALTER TABLE testimonials ADD COLUMN IF NOT EXISTS project_id INTEGER
      `)
      console.log('✓ project_id column added to testimonials table')
    } catch (error) {
      console.log('✓ project_id column already exists')
    }

    // Add description column if it doesn't exist
    try {
      await pool.query(`
        ALTER TABLE testimonials ADD COLUMN IF NOT EXISTS description TEXT
      `)
      console.log('✓ description column added to testimonials table')
    } catch (error) {
      console.log('✓ description column already exists')
    }
    console.log('✓ Testimonials table created')

    console.log('✓ All migrations completed successfully')
    process.exit(0)
  } catch (error) {
    console.error('Migration error:', error)
    process.exit(1)
  }
}

migrate()

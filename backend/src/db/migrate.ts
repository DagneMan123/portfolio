import pool from '../config/database.js'

async function migrate() {
  try {
    console.log('Running migrations...')

    // Create testimonials table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS testimonials (
        id SERIAL PRIMARY KEY,
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
    console.log('✓ Testimonials table created')

    console.log('✓ All migrations completed successfully')
    process.exit(0)
  } catch (error) {
    console.error('Migration error:', error)
    process.exit(1)
  }
}

migrate()

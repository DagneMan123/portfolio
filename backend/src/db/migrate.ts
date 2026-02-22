import pool from '../config/database.js'

const migrate = async () => {
  try {
    console.log('Running migrations...')

    // Create projects table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS projects (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        technologies VARCHAR(255) NOT NULL,
        link VARCHAR(255),
        github VARCHAR(255),
        featured BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // Create contact messages table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS contact_messages (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        subject VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)

    console.log('Migrations completed successfully')
    process.exit(0)
  } catch (error) {
    console.error('Migration failed:', error)
    process.exit(1)
  }
}

migrate()

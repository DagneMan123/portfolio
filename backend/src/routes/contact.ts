import express from 'express'
import pool from '../config/database.js'
import { sendContactEmail } from '../services/emailService.js'

const router = express.Router()

router.post('/', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body

    // Validate
    if (!name || !email || !phone || !subject || !message) {
      return res.status(400).json({ error: 'All fields required' })
    }

    // Save to database
    await pool.query(
      'INSERT INTO contact_messages (name, email, subject, message) VALUES ($1, $2, $3, $4)',
      [name, email, subject, message]
    )

    // Send emails
    await sendContactEmail(name, email, phone, subject, message)

    res.json({ success: true, message: 'Message sent successfully' })
  } catch (error) {
    console.error('Contact error:', error)
    res.status(500).json({ error: 'Failed to send message' })
  }
})

export default router

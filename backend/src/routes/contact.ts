import { Router } from 'express'
import { body, validationResult } from 'express-validator'
import pool from '../config/database.js'

const router = Router()

// Submit contact form
router.post('/', [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('subject').trim().notEmpty().withMessage('Subject is required'),
  body('message').trim().notEmpty().withMessage('Message is required'),
], async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { name, email, subject, message } = req.body

    const result = await pool.query(
      'INSERT INTO contact_messages (name, email, subject, message) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, email, subject, message]
    )

    console.log('New contact message:', result.rows[0])

    res.status(201).json({ message: 'Message sent successfully' })
  } catch (error) {
    console.error('Error submitting contact form:', error)
    res.status(500).json({ error: 'Failed to submit message' })
  }
})

// Get all messages (admin only)
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM contact_messages ORDER BY created_at DESC')
    res.json(result.rows)
  } catch (error) {
    console.error('Error fetching messages:', error)
    res.status(500).json({ error: 'Failed to fetch messages' })
  }
})

export default router

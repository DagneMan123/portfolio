import { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import pool from '../config/database.js';
import crypto from 'crypto';

const router = Router();

// State for dynamic schema detection
let hasProjectIdColumn = false;
let hasDescriptionColumn = false;

/**
 * Robust check for database schema
 */
async function checkColumns() {
  try {
    const result = await pool.query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'testimonials'
    `);
    const columns = result.rows.map((r: any) => r.column_name);
    hasProjectIdColumn = columns.includes('project_id');
    hasDescriptionColumn = columns.includes('description');
    console.log(`Schema Sync: project_id(${hasProjectIdColumn}), description(${hasDescriptionColumn})`);
  } catch (error) {
    console.error('Schema sync failed:', error);
  }
}

// Initial sync
checkColumns();

function generateEditToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

/**
 * GET: Fetch approved testimonials
 * Logic: 
 * - If projectId is provided: Returns only testimonials for that project.
 * - If projectId is NOT provided: Returns ALL approved testimonials (for Header/Home).
 */
router.get('/public', async (req: Request, res: Response) => {
  try {
    const { projectId } = req.query;
    
    // Ensure columns are checked before querying
    if (!hasProjectIdColumn) await checkColumns();

    let query = 'SELECT id, author_name, author_title, quote, image_url, edit_token, created_at';
    const params: any[] = [];
    
    if (hasProjectIdColumn) query += ', project_id';
    if (hasDescriptionColumn) query += ', description';
    
    query += ' FROM testimonials WHERE is_approved = true';
    
    // Filtering Logic
    if (projectId && hasProjectIdColumn) {
      const projectIdNum = parseInt(projectId as string);
      if (!isNaN(projectIdNum)) {
        query += ' AND project_id = $1';
        params.push(projectIdNum);
      }
    } 
    // Note: If no projectId is passed, we skip the AND clause 
    // so it returns everything for the Global/Header view.

    query += ' ORDER BY created_at DESC';
    
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (error) {
    console.error('Public Fetch Error:', error);
    res.status(500).json({ error: 'Failed to fetch testimonials' });
  }
});

/**
 * POST: Submit new testimonial
 */
router.post('/', [
  body('author_name').trim().notEmpty().withMessage('Name is required'),
  body('author_title').trim().notEmpty().withMessage('Title is required'),
  body('quote').trim().notEmpty().withMessage('Quote is required'),
], async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { author_name, author_title, quote, image_url, project_id, description } = req.body;
    const edit_token = generateEditToken();
    const projectIdNum = project_id ? parseInt(project_id) : null;

    let columns = ['author_name', 'author_title', 'quote', 'image_url', 'edit_token', 'is_approved'];
    let values = ['$1', '$2', '$3', '$4', '$5', '$6'];
    let params = [author_name, author_title, quote, image_url || null, edit_token, true];

    if (hasProjectIdColumn) {
      columns.push('project_id');
      values.push(`$${params.length + 1}`);
      params.push(projectIdNum);
    }

    if (hasDescriptionColumn) {
      columns.push('description');
      values.push(`$${params.length + 1}`);
      params.push(description || null);
    }

    const sql = `INSERT INTO testimonials (${columns.join(', ')}) VALUES (${values.join(', ')}) RETURNING *`;
    const result = await pool.query(sql, params);

    res.status(201).json({
      message: 'Testimonial submitted and approved!',
      testimonial: result.rows[0]
    });
  } catch (error) {
    console.error('Submission Error:', error);
    res.status(500).json({ error: 'Failed to submit testimonial' });
  }
});

/**
 * PUT: Update testimonial
 */
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { author_name, author_title, quote, image_url, is_approved, project_id, description } = req.body;
    const projectIdNum = project_id ? parseInt(project_id) : null;

    let query = 'UPDATE testimonials SET author_name = $1, author_title = $2, quote = $3, image_url = $4, is_approved = $5';
    const params = [author_name, author_title, quote, image_url || null, is_approved || false];
    let count = 6;

    if (hasDescriptionColumn) {
      query += `, description = $${count}`;
      params.push(description || null);
      count++;
    }

    if (hasProjectIdColumn) {
      query += `, project_id = $${count}`;
      params.push(projectIdNum);
      count++;
    }

    query += `, updated_at = CURRENT_TIMESTAMP WHERE id = $${count} RETURNING *`;
    params.push(id);

    const result = await pool.query(query, params);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Not found' });

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Update failed' });
  }
});

/**
 * ADMIN: Get All
 */
router.get('/admin/all', async (_req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM testimonials ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Fetch failed' });
  }
});

/**
 * DELETE: Remove testimonial
 */
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const result = await pool.query('DELETE FROM testimonials WHERE id = $1 RETURNING *', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Delete failed' });
  }
});

export default router;
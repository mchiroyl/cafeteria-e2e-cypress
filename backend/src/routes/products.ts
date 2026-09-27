import { Router } from 'express'
import { pool } from '../db'

const router = Router()

router.get('/', async (_req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, name, price, available, stock FROM products ORDER BY id'
    )
    res.json(result.rows)
  } catch {
    res.status(500).json({ error: 'SERVER_ERROR' })
  }
})

export default router

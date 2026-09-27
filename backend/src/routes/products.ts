import { Router } from 'express'
import { pool } from '../db'

const router = Router()

router.get('/', async (_req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, name, price, available, stock FROM products ORDER BY id'
    )
    const products = result.rows.map(p => ({
      ...p,
      price: Number(p.price)
    }))
    res.json(products)
  } catch {
    res.status(500).json({ error: 'SERVER_ERROR' })
  }
})

export default router

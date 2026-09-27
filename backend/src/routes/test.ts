import { Router } from 'express'
import { pool } from '../db'
import fs from 'fs'
import path from 'path'

const router = Router()

router.post('/reset', async (_req, res) => {
  if (process.env.NODE_ENV !== 'test') {
    return res.status(403).json({ error: 'FORBIDDEN' })
  }
  try {
    const seed = fs.readFileSync(
      path.join(__dirname, '../db/seed.sql'), 'utf8'
    )
    await pool.query(seed)
    res.json({ ok: true })
  } catch {
    res.status(500).json({ error: 'RESET_FAILED' })
  }
})

export default router

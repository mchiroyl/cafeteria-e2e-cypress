import { Router } from 'express'
import { pool } from '../db'
import fs from 'fs'
import path from 'path'

const router = Router()

// Resuelve seed.sql relativo al directorio de trabajo (backend/)
// process.cwd() = backend/ tanto en dev (ts-node-dev) como en prod (node dist/server.js)
// __dirname en dist/routes/ apuntaría a dist/db/ que no existe tras tsc
const SEED_PATH = path.join(process.cwd(), 'src', 'db', 'seed.sql')

router.post('/reset', async (_req, res) => {
  if (process.env.NODE_ENV !== 'test') {
    return res.status(403).json({ error: 'FORBIDDEN' })
  }
  try {
    const seed = fs.readFileSync(SEED_PATH, 'utf8')
    await pool.query(seed)
    res.json({ ok: true })
  } catch (err) {
    console.error('RESET_FAILED:', err)
    res.status(500).json({ error: 'RESET_FAILED' })
  }
})

export default router

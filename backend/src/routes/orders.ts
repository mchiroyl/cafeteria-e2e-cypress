import { Router } from 'express'
import { pool } from '../db'

const router = Router()

router.post('/', async (req, res) => {
  const { items } = req.body

  if (!items || items.length === 0) {
    return res.status(400).json({ error: 'EMPTY_CART' })
  }

  const client = await pool.connect()
  try {
    await client.query('BEGIN')

    let total = 0
    const resolvedItems = []

    for (const item of items) {
      const { rows } = await client.query(
        'SELECT id, price, stock FROM products WHERE id = $1',
        [item.productId]
      )
      const product = rows[0]
      if (!product || product.stock < item.quantity) {
        await client.query('ROLLBACK')
        return res.status(400).json({ error: 'OUT_OF_STOCK', productId: item.productId })
      }
      total += product.price * item.quantity
      resolvedItems.push({ ...item, unitPrice: product.price })

      await client.query(
        'UPDATE products SET stock = stock - $1 WHERE id = $2',
        [item.quantity, item.productId]
      )
    }

    const orderResult = await client.query(
      'INSERT INTO orders (total) VALUES ($1) RETURNING id',
      [total]
    )
    const orderId = orderResult.rows[0].id

    for (const item of resolvedItems) {
      await client.query(
        'INSERT INTO order_items (order_id, product_id, quantity, unit_price) VALUES ($1,$2,$3,$4)',
        [orderId, item.productId, item.quantity, item.unitPrice]
      )
    }

    await client.query('COMMIT')
    res.status(201).json({ orderId, total: Number(total.toFixed(2)) })
  } catch {
    await client.query('ROLLBACK')
    res.status(500).json({ error: 'SERVER_ERROR' })
  } finally {
    client.release()
  }
})

export default router

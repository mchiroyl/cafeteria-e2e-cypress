import express from 'express'
import cors from 'cors'
import productsRouter from './routes/products'
import ordersRouter from './routes/orders'
import testRouter from './routes/test'

const app = express()
app.use(cors({ origin: 'http://localhost:5173' }))
app.use(express.json())

app.use('/api/products', productsRouter)
app.use('/api/orders', ordersRouter)
app.use('/api/test', testRouter)

export default app

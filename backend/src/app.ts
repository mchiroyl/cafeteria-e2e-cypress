import express from 'express'
import cors from 'cors'
import productsRouter from './routes/products'
import ordersRouter from './routes/orders'
import testRouter from './routes/test'

const app = express()
app.use(cors({ origin: 'http://localhost:5173' }))
app.use(express.json())

app.get('/', (req, res) => {
  if (req.accepts('html')) {
    res.send(`
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>☕ Cafetería E2E — API Service</title>
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700&display=swap" rel="stylesheet">
        <style>
          * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Plus Jakarta Sans', sans-serif; }
          body { background: #0f0d0c; color: #f5ede6; display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 24px; }
          .card { background: #1a1512; border: 1px solid #32251e; border-radius: 18px; max-width: 650px; width: 100%; padding: 36px; box-shadow: 0 20px 40px rgba(0,0,0,0.5); }
          .header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px; border-bottom: 1px solid #2e211a; padding-bottom: 20px; }
          .title { font-size: 24px; font-weight: 700; color: #f4d3a1; display: flex; align-items: center; gap: 10px; }
          .badge { background: #10321d; color: #48bb78; border: 1px solid #22543d; padding: 6px 14px; border-radius: 9999px; font-size: 13px; font-weight: 600; }
          p { color: #b7a99f; font-size: 15px; line-height: 1.6; margin-bottom: 24px; }
          .endpoints { display: flex; flex-direction: column; gap: 12px; }
          .endpoint { background: #231b17; border: 1px solid #3c2c22; padding: 14px 18px; border-radius: 12px; display: flex; align-items: center; justify-content: space-between; text-decoration: none; color: inherit; transition: all 0.2s ease; }
          .endpoint:hover { background: #2f231d; border-color: #d4954e; transform: translateY(-2px); }
          .method { font-size: 12px; font-weight: 700; padding: 4px 8px; border-radius: 6px; }
          .method.get { background: #1c3d5a; color: #63b3ed; }
          .method.post { background: #2c5282; color: #90cdf4; }
          .path { font-family: monospace; font-size: 14px; color: #e2d7cf; }
          .desc { font-size: 13px; color: #8e7c70; }
          .frontend-btn { display: block; text-align: center; margin-top: 28px; background: linear-gradient(135deg, #d4954e, #b8752c); color: #1a1006; font-weight: 700; padding: 14px; border-radius: 12px; text-decoration: none; transition: opacity 0.2s; }
          .frontend-btn:hover { opacity: 0.9; }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="header">
            <h1 class="title">☕ Cafetería E2E API</h1>
            <span class="badge">● Online (200 OK)</span>
          </div>
          <p>Servicio backend REST para la gestión de productos, órdenes y pruebas automatizadas E2E de la cafetería.</p>
          <div class="endpoints">
            <a href="/api/products" class="endpoint" target="_blank">
              <div style="display: flex; align-items: center; gap: 10px;">
                <span class="method get">GET</span>
                <span class="path">/api/products</span>
              </div>
              <span class="desc">Ver catálogo JSON ↗</span>
            </a>
            <div class="endpoint">
              <div style="display: flex; align-items: center; gap: 10px;">
                <span class="method post">POST</span>
                <span class="path">/api/orders</span>
              </div>
              <span class="desc">Crear nueva orden</span>
            </div>
            <div class="endpoint">
              <div style="display: flex; align-items: center; gap: 10px;">
                <span class="method post">POST</span>
                <span class="path">/api/test/reset</span>
              </div>
              <span class="desc">Reset base de datos (CI/Test)</span>
            </div>
          </div>
          <a href="http://localhost:5173" class="frontend-btn">Ir al Frontend de la Cafetería (Puerto 5173) →</a>
        </div>
      </body>
      </html>
    `)
    return
  }
  res.json({
    status: 'online',
    service: 'cafeteria-backend',
    version: '1.0.0',
    endpoints: {
      products: 'GET /api/products',
      orders: 'POST /api/orders',
      testReset: 'POST /api/test/reset'
    }
  })
})

app.use('/api/products', productsRouter)
app.use('/api/orders', ordersRouter)
app.use('/api/test', testRouter)

export default app

import { useEffect, useState } from 'react'
import { Product, CartItem, OrderResult } from './types'
import { fetchProducts, createOrder } from './api'
import { ProductList } from './components/ProductList'
import { Cart } from './components/Cart'
import { OrderConfirmation } from './components/OrderConfirmation'

export default function App() {
  const [products, setProducts] = useState<Product[]>([])
  const [cart, setCart] = useState<CartItem[]>([])
  const [order, setOrder] = useState<OrderResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchProducts().then(setProducts).catch(() => setError('Error al cargar productos'))
  }, [])

  const addToCart = (product: Product) => {
    setCart(prev => {
      const exists = prev.find(i => i.product.id === product.id)
      if (exists) return prev.map(i =>
        i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
      )
      return [...prev, { product, quantity: 1 }]
    })
  }

  const changeQty = (productId: number, qty: number) => {
    if (qty < 1) return
    setCart(prev => prev.map(i =>
      i.product.id === productId ? { ...i, quantity: qty } : i
    ))
  }

  const confirmOrder = async () => {
    if (cart.length === 0) {
      setError('EMPTY_CART')
      return
    }
    setLoading(true)
    setError(null)
    try {
      const result = await createOrder(
        cart.map(i => ({ productId: i.product.id, quantity: i.quantity }))
      )
      setOrder(result)
      setCart([])
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'Error al confirmar la orden'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  const newOrder = () => { setOrder(null); setError(null) }

  if (order) return <OrderConfirmation result={order} onNew={newOrder} />

  return (
    <main>
      <h1>Cafetería E2E</h1>
      <ProductList products={products} onAdd={addToCart} />
      <Cart
        items={cart}
        onChangeQty={changeQty}
        onConfirm={confirmOrder}
        loading={loading}
        error={error}
      />
    </main>
  )
}

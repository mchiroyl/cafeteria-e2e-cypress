const BASE = 'http://localhost:3000/api'

export async function fetchProducts() {
  const res = await fetch(`${BASE}/products`)
  if (!res.ok) throw new Error('SERVER_ERROR')
  return res.json()
}

export async function createOrder(items: { productId: number; quantity: number }[]) {
  const res = await fetch(`${BASE}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ items })
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || 'SERVER_ERROR')
  return data
}

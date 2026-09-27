export interface Product {
  id: number
  name: string
  price: number
  available: boolean
  stock: number
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface OrderResult {
  orderId: number
  total: number
}

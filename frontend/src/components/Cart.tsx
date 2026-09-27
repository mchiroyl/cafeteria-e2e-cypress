import { CartItem } from '../types'

interface Props {
  items: CartItem[]
  onChangeQty: (productId: number, qty: number) => void
  onConfirm: () => void
  loading: boolean
  error: string | null
}

export function Cart({ items, onChangeQty, onConfirm, loading, error }: Props) {
  const total = items.reduce((sum, i) => sum + Number(i.product.price) * i.quantity, 0)

  return (
    <section>
      <h2>Mi Pedido</h2>

      {items.length === 0 && (
        <p data-cy="empty-cart-msg">El carrito está vacío.</p>
      )}

      {items.map(i => (
        <div key={i.product.id} data-cy="cart-item">
          <span>{i.product.name}</span>
          <input
            type="number"
            min={1}
            value={i.quantity}
            data-cy="cart-item-qty"
            onChange={e => onChangeQty(i.product.id, Number(e.target.value))}
          />
          <span>Q{(Number(i.product.price) * i.quantity).toFixed(2)}</span>
        </div>
      ))}

      <p>Total: <strong data-cy="cart-total">Q{Number(total).toFixed(2)}</strong></p>

      {error && <p data-cy="error-message" style={{ color: 'red' }}>{error}</p>}

      {loading && <p data-cy="loading">Procesando...</p>}

      <button
        data-cy="confirm-order"
        onClick={onConfirm}
        disabled={loading}
      >
        Confirmar Orden
      </button>
    </section>
  )
}

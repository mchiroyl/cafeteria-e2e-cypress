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
    <section className="cart-panel">
      <h2>🛒 Mi Pedido</h2>

      {items.length === 0 && (
        <p data-cy="empty-cart-msg" className="cart-empty">El carrito está vacío.</p>
      )}

      {items.length > 0 && (
        <div className="cart-items-list">
          {items.map(i => (
            <div key={i.product.id} data-cy="cart-item" className="cart-item-card">
              <span className="cart-item-name">{i.product.name}</span>
              <input
                type="number"
                min={1}
                value={i.quantity}
                data-cy="cart-item-qty"
                className="cart-item-qty-input"
                onChange={e => onChangeQty(i.product.id, Number(e.target.value))}
              />
              <span className="cart-item-subtotal">Q{(Number(i.product.price) * i.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>
      )}

      <p className="cart-summary">
        <span>Total de la Orden:</span>
        <strong data-cy="cart-total" className="cart-total-amount">Q{Number(total).toFixed(2)}</strong>
      </p>

      {error && <p data-cy="error-message" className="alert-error">{error}</p>}

      {loading && <p data-cy="loading" className="alert-loading">Procesando orden...</p>}

      <button
        data-cy="confirm-order"
        className="btn-confirm"
        onClick={onConfirm}
        disabled={loading}
      >
        Confirmar Orden
      </button>
    </section>
  )
}

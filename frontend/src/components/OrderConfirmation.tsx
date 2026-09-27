import { OrderResult } from '../types'

interface Props {
  result: OrderResult
  onNew: () => void
}

export function OrderConfirmation({ result, onNew }: Props) {
  return (
    <section className="confirmation-container">
      <div className="success-icon-badge">✓</div>
      <h2>¡Orden Confirmada!</h2>
      <p style={{ color: 'var(--text-secondary)' }}>Tu pedido ha sido recibido y está siendo preparado en barra.</p>
      
      <div className="confirmation-receipt">
        <div className="receipt-row">
          <span>Número de orden:</span>
          <strong data-cy="order-id">#{result.orderId}</strong>
        </div>
        <div className="receipt-row">
          <span>Total cancelado:</span>
          <strong data-cy="order-total">Q{Number(result.total).toFixed(2)}</strong>
        </div>
      </div>

      <button onClick={onNew} data-cy="new-order" className="btn-new-order">
        Realizar Nueva Orden
      </button>
    </section>
  )
}

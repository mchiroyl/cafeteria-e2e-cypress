import { OrderResult } from '../types'

interface Props {
  result: OrderResult
  onNew: () => void
}

export function OrderConfirmation({ result, onNew }: Props) {
  return (
    <section>
      <h2>¡Orden Confirmada!</h2>
      <p>Número de orden: <strong data-cy="order-id">{result.orderId}</strong></p>
      <p>Total: <strong data-cy="order-total">Q{Number(result.total).toFixed(2)}</strong></p>
      <button onClick={onNew} data-cy="new-order">Nueva Orden</button>
    </section>
  )
}

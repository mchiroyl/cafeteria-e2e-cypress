import { Product } from '../types'

interface Props {
  products: Product[]
  onAdd: (product: Product) => void
}

export function ProductList({ products, onAdd }: Props) {
  return (
    <section>
      <h2>Menú</h2>
      {products.map(p => (
        <div key={p.id} data-cy="product-item">
          <span>{p.name}</span>
          <span> — Q{p.price.toFixed(2)}</span>
          <span data-cy="product-availability">
            {p.available && p.stock > 0
              ? ' ✅ Disponible'
              : ' ❌ Agotado'}
          </span>
          <button
            data-cy="add-to-cart"
            onClick={() => onAdd(p)}
            disabled={!p.available || p.stock === 0}
          >
            Agregar
          </button>
        </div>
      ))}
    </section>
  )
}

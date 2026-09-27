import { Product } from '../types'

interface Props {
  products: Product[]
  onAdd: (product: Product) => void
}

export function ProductList({ products, onAdd }: Props) {
  return (
    <section>
      <h2>☕ Catálogo de Cafetería</h2>
      <div className="products-grid">
        {products.map(p => (
          <div key={p.id} data-cy="product-item" className="product-card">
            <div className="product-info">
              <span className="product-name">{p.name}</span>
              <span className="product-price"> — Q{Number(p.price).toFixed(2)}</span>
              <span
                data-cy="product-availability"
                className={`product-availability ${p.available && p.stock > 0 ? 'available' : 'out-of-stock'}`}
              >
                {p.available && p.stock > 0
                  ? ' ✅ Disponible'
                  : ' ❌ Agotado'}
              </span>
            </div>
            <button
              data-cy="add-to-cart"
              className="btn-add"
              onClick={() => onAdd(p)}
              disabled={!p.available || p.stock === 0}
            >
              Agregar al carrito
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}

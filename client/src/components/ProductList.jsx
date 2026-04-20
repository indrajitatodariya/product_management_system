function ProductList({ products, loading, onDelete, onUpdate }) {
  if (loading) {
    return <p>Loading products...</p>;
  }

  if (products.length === 0) {
    return <p>No products found.</p>;
  }

  return (
    <ul className="product-grid">
      {products.map((product) => (
        <li key={product._id} className="product-card">
          <div className="product-card-body">
            <div className="product-avatar">
              {product.name ? product.name.charAt(0).toUpperCase() : '?'}
            </div>
            <div className="product-details">
              <h3>{product.name}</h3>
              <strong>Rs. {Number(product.price).toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</strong>
            </div>
          </div>

          <div className="product-footer">
            <button
              type="button"
              className="action-btn update-btn"
              onClick={() => onUpdate(product._id)}
              title="Edit Product"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
            </button>
            <button
              type="button"
              className="action-btn delete-btn"
              onClick={() => onDelete(product._id)}
              title="Delete Product"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default ProductList;

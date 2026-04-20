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
          <div className="row-between name-price-row">
            <h3>{product.name}</h3>
            <strong>Rs. {Number(product.price).toFixed(2)}</strong>
          </div>

          <div className="product-footer">
            <button
              type="button"
              className="update-btn"
              onClick={() => onUpdate(product._id)}
            >
              Update
            </button>
            <button
              type="button"
              className="delete-btn"
              onClick={() => onDelete(product._id)}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default ProductList;

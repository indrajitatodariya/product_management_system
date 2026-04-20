function ProductForm({
  show,
  name,
  price,
  isEditing,
  onNameChange,
  onPriceChange,
  onSubmit,
  onClose,
}) {
  if (!show) return null;

  return (
    <div className="drawer-overlay" onClick={onClose}>
      <div className="drawer drawer-open" onClick={(e) => e.stopPropagation()}>
        <form className="drawer-form" onSubmit={onSubmit}>
          <div className="drawer-header">
            <h3>{isEditing ? "Update Product" : "Add New Product"}</h3>
            <button type="button" className="close-btn" onClick={onClose}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>
          <div className="drawer-body">
            <div className="input-group">
              <label>Product Name</label>
              <input
                type="text"
                value={name}
                onChange={(event) => onNameChange(event.target.value)}
                placeholder="Enter product name"
              />
            </div>

            <div className="input-group">
              <label>Price (Rs.)</label>
              <input
                type="text"
                value={price}
                onChange={(event) => onPriceChange(event.target.value)}
                placeholder="0.00"
              />
            </div>
          </div>
          
          <div className="drawer-footer">
            <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
            <button type="submit" className="primary-btn">{isEditing ? "Save Changes" : "Save Product"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductForm;

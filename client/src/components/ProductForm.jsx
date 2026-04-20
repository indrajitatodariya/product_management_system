function ProductForm({
  show,
  name,
  price,
  onNameChange,
  onPriceChange,
  onSubmit,
  onClose,
}) {
  if (!show) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <form
        className="product-form modal-form"
        onSubmit={onSubmit}
        onClick={(e) => e.stopPropagation()}
      >
        <h3>Add Product</h3>
        <label className="field-label">Product name</label>
        <input
          type="text"
          value={name}
          onChange={(event) => onNameChange(event.target.value)}
          placeholder="Enter product name"
        />

        <label className="field-label">Price</label>
        <input
          type="text"
          value={price}
          onChange={(event) => onPriceChange(event.target.value)}
          placeholder="Enter price"
        />

        <div className="form-actions">
          <button type="submit">Add Product</button>
          <button type="button" className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProductForm;

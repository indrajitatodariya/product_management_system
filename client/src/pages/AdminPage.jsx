import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductForm from "../components/ProductForm";
import ProductList from "../components/ProductList";
import useProducts from "../hooks/useProducts";

function AdminPage() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const token = localStorage.getItem("token") || "";
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const products = useProducts(token, setMessage);

  const filteredProducts = products.products.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalProducts = products.products.length;
  const inventoryValue = products.products.reduce(
    (total, item) => total + Number(item.price || 0),
    0
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleAddSubmit = async (event) => {
    const success = await products.handleSubmit(event);
    if (success) {
      setShowAddForm(false);
    }
  };

  const handleUpdateClick = (id) => {
    products.startEditing(id);
    setShowAddForm(true);
  };

  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <h2>Product Manager</h2>
        </div>
        <nav className="sidebar-nav">
          <a href="#" className="nav-item active">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
            Dashboard
          </a>
        </nav>
        
        <div className="sidebar-bottom">
          <div className="user-profile">
            <div className="avatar">{user ? user.name.charAt(0).toUpperCase() : 'A'}</div>
            <div className="user-info">
              <span className="user-name">{user ? user.name : 'Admin'}</span>
              <span className="user-email">{user ? user.email : ''}</span>
            </div>
          </div>
          <button className="logout-btn" type="button" onClick={handleLogout}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
            Logout
          </button>
        </div>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-header">
          <div className="header-search">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="search-icon"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            <input
              className="search-input"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search products by name..."
            />
          </div>
          <button
            className="primary-btn add-product-btn"
            onClick={() => {
              products.clearForm();
              setShowAddForm(true);
            }}
            type="button"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            Add Product
          </button>
        </header>

        <div className="dashboard-content">
          <section className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon purple-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>
              </div>
              <div className="stat-info">
                <p>Total Products</p>
                <h2>{totalProducts}</h2>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon green-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3h12"></path><path d="M6 8h12"></path><path d="M6 13l8.5 8"></path><path d="M6 13h3"></path><path d="M9 13c6.667 0 6.667-10 0-10"></path></svg>
              </div>
              <div className="stat-info">
                <p>Inventory Value</p>
                <h2>Rs. {inventoryValue.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</h2>
              </div>
            </div>
          </section>

          {message && <div className="message-box error">{message}</div>}

          <div className="product-list-container">
            <div className="list-header">
              <h2>Inventory Overview</h2>
            </div>
            <ProductList
              products={filteredProducts}
              loading={products.loading}
              onUpdate={handleUpdateClick}
              onDelete={products.handleDelete}
            />
          </div>
        </div>

        <ProductForm
          show={showAddForm}
          name={products.name}
          price={products.price}
          isEditing={!!products.editingId}
          onNameChange={products.setName}
          onPriceChange={products.setPrice}
          onSubmit={handleAddSubmit}
          onClose={() => {
            setShowAddForm(false);
            products.clearForm();
          }}
        />
      </main>
    </div>
  );
}

export default AdminPage;

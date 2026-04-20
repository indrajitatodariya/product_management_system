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
    await products.handleSubmit(event);

    if (products.name.trim() && !Number.isNaN(Number(products.price))) {
      setShowAddForm(false);
    }
  };

  return (
    <main className="container">
      <header className="top-bar">
        <div>
          <h1>Admin Panel</h1>
          <p>Manage your catalog with ease</p>
        </div>
        <div className="top-actions">
          <button
            className="add-btn"
            onClick={() => setShowAddForm((prev) => !prev)}
            type="button"
          >
            + Add product
          </button>
          <button className="logout-mini-btn" type="button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      <p className="auth-state">
        {user ? `Logged in as ${user.name} (${user.email})` : "Admin"}
      </p>

      <section className="stats-grid">
        <div className="stat-card">
          <p>Total products</p>
          <h2>{totalProducts}</h2>
        </div>
        <div className="stat-card">
          <p>Inventory value</p>
          <h2>Rs. {inventoryValue.toFixed(2)}</h2>
        </div>
      </section>

      <ProductForm
        show={showAddForm}
        name={products.name}
        price={products.price}
        onNameChange={products.setName}
        onPriceChange={products.setPrice}
        onSubmit={handleAddSubmit}
        onClose={() => setShowAddForm(false)}
      />

      <input
        className="search-input"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Search by name..."
      />

      {message && <p className="message">{message}</p>}

      <ProductList
        products={filteredProducts}
        loading={products.loading}
        onUpdate={products.handleUpdate}
        onDelete={products.handleDelete}
      />
    </main>
  );
}

export default AdminPage;

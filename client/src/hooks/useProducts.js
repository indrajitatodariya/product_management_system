import { useEffect, useState } from "react";
import { productApi } from "../services/api";
import { useNavigate } from "react-router-dom";

function useProducts(token, setMessage) {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const navigate = useNavigate();

  const isNumber = (value) => !Number.isNaN(Number(value));

  const handleApiError = (error) => {
    setMessage(error.message || "An error occurred");
    if (error.message === "Invalid token" || error.message === "Unauthorized") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login");
    }
  };

  const requireLogin = () => {
    if (token) return true;
    setMessage("Please login first");
    navigate("/login");
    return false;
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await productApi.getAll();
      setProducts(data);
    } catch (error) {
      handleApiError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");

    if (!requireLogin()) return;

    if (!name.trim()) {
      setMessage("Name is required");
      return;
    }

    if (!isNumber(price)) {
      setMessage("Price must be a number");
      return;
    }

    try {
      if (editingId) {
        const updatedProduct = await productApi.update(
          editingId,
          { name: name.trim(), price: Number(price) },
          token
        );
        setProducts((prevProducts) =>
          prevProducts.map((item) => (item._id === editingId ? updatedProduct : item))
        );
        setMessage("Product updated successfully");
      } else {
        await productApi.create({ name: name.trim(), price: Number(price) }, token);
        setMessage("Product added successfully");
        fetchProducts();
      }
      
      setName("");
      setPrice("");
      setEditingId(null);
      return true;
    } catch (error) {
      handleApiError(error);
      return false;
    }
  };

  const handleDelete = async (id) => {
    if (!requireLogin()) return;

    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }

    try {
      await productApi.remove(id, token);
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== id)
      );
      setMessage("Product deleted successfully");
    } catch (error) {
      handleApiError(error);
    }
  };

  const startEditing = (id) => {
    const current = products.find((item) => item._id === id);
    if (current) {
      setName(current.name);
      setPrice(String(current.price ?? ""));
      setEditingId(id);
    }
  };

  const clearForm = () => {
    setName("");
    setPrice("");
    setEditingId(null);
    setMessage("");
  };

  return {
    products,
    name,
    price,
    loading,
    editingId,
    setName,
    setPrice,
    handleSubmit,
    startEditing,
    handleDelete,
    clearForm
  };
}

export default useProducts;

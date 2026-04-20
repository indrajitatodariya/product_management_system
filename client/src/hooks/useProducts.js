import { useEffect, useState } from "react";
import { productApi } from "../services/api";

function useProducts(token, setMessage) {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const isNumber = (value) => !Number.isNaN(Number(value));

  const requireLogin = () => {
    if (token) return true;
    setMessage("Please login first");
    return false;
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await productApi.getAll();
      setProducts(data);
    } catch (error) {
      setMessage(error.message || "Could not load products");
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
      await productApi.create({ name, price }, token);
      setName("");
      setPrice("");
      setMessage("Product added");
      fetchProducts();
    } catch (error) {
      setMessage(error.message || "Failed to add product");
    }
  };

  const handleDelete = async (id) => {
    if (!requireLogin()) return;

    try {
      await productApi.remove(id, token);
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== id)
      );
    } catch (error) {
      setMessage(error.message || "Could not delete product");
    }
  };

  const handleUpdate = async (id) => {
    if (!requireLogin()) return;

    const current = products.find((item) => item._id === id);
    if (!current) return;

    const updatedName = window.prompt("Enter updated product name", current.name);
    if (updatedName === null) return;
    if (!updatedName.trim()) {
      setMessage("Name is required");
      return;
    }

    const updatedPrice = window.prompt(
      "Enter updated price",
      String(current.price ?? "")
    );
    if (updatedPrice === null) return;
    if (!isNumber(updatedPrice)) {
      setMessage("Price must be a number");
      return;
    }

    try {
      const updatedProduct = await productApi.update(
        id,
        { name: updatedName, price: Number(updatedPrice) },
        token
      );
      setProducts((prevProducts) =>
        prevProducts.map((item) => (item._id === id ? updatedProduct : item))
      );
      setMessage("Product updated");
    } catch (error) {
      setMessage(error.message || "Could not update product");
    }
  };

  return {
    products,
    name,
    price,
    loading,
    setName,
    setPrice,
    handleSubmit,
    handleUpdate,
    handleDelete,
  };
}

export default useProducts;

const Product = require("../models/Product");
const parsePrice = (value) => Number(value);

const getProducts = async (_req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch products" });
  }
};

const addProduct = async (req, res) => {
  try {
    const { name, price, image } = req.body;

    if (!name || !String(name).trim()) {
      return res.status(400).json({ message: "Name is required" });
    }

    const parsedPrice = parsePrice(price);
    if (Number.isNaN(parsedPrice)) {
      return res.status(400).json({ message: "Price must be a number" });
    }

    const product = await Product.create({
      name: String(name).trim(),
      price: parsedPrice,
      image: image ? String(image).trim() : "",
    });

    return res.status(201).json(product);
  } catch (error) {
    return res.status(500).json({ message: "Failed to create product" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json({ message: "Product deleted" });
  } catch (error) {
    return res.status(400).json({ message: "Invalid product id" });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price } = req.body;

    if (!name || !String(name).trim()) {
      return res.status(400).json({ message: "Name is required" });
    }

    const parsedPrice = parsePrice(price);
    if (Number.isNaN(parsedPrice)) {
      return res.status(400).json({ message: "Price must be a number" });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name: String(name).trim(), price: parsedPrice },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json(updatedProduct);
  } catch (error) {
    return res.status(400).json({ message: "Invalid product id" });
  }
};

module.exports = {
  getProducts,
  addProduct,
  deleteProduct,
  updateProduct,
};

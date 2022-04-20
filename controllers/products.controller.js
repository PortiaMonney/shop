const Product = require("../models/product.models");

const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.staus(400).json({ error: error.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(201).json(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const getSingleProduct = async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const updateProduct = async (req, res) => {
  try {
    const productId = req.params.productId;
    let product = await Product.findById(product);
    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }
    product = await Product.findByIdAndUpdate(productId, req.body, {
      new: true,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ msg: "Product deleted" });
    }
    await Product.findByIdAndDelete(productId);
    res.status(200).json({ msg: "Product deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
module.exports = {
  createProduct,
  updateProduct,
  getAllProducts,
  getSingleProduct,
  deleteProduct,
};

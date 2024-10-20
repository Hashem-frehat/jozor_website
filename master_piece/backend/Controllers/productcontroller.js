const Product = require("../Models/products");

exports.getPartnerProducts = async (req, res) => {
  try {
    const products = await Product.find({ partnerId: req.params.id });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.addProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    if (req.file) {
      newProduct.photo = req.file.path;
    }
    const newproducts = new Product(newProduct);
    await newproducts.save();
    res.status(201).json(newproducts);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

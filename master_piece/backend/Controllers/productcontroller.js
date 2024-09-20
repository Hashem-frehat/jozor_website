const Product = require("../Models/products");
// const Rating = require("../Models/comment");

exports.getProducts = async (req, res) => {
  try {
    const partnerId = req.user.id;
    const products = await Product.find({ partnerId });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products" });
  }
};
exports.createProduct = async (req, res) => {
  try {
    const partnerId = req.user.id;
    const { name, description, price, discount, logo } = req.body;

    if (!name || !description || !price) {
      return res
        .status(400)
        .json({ message: "Name, description, and price are required" });
    }

    const productData = {
      name,
      description,
      price,
      logo,
      partnerId,
    };

    if (discount !== undefined && discount !== null && discount !== "") {
      productData.discount = discount;
    }

    const newProduct = new Product(productData);
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error("Error creating product:", error); // Log detailed error
    res
      .status(500)
      .json({ message: "Error creating product", error: error.message });
  }
};

// exports.addRating = async (req, res) => {
//   try {
//     const { productId, rating, comment } = req.body;
//     const userId = req.user.id; // Assuming you have user authentication

//     const newRating = new Rating({
//       userId,
//       productId,
//       rating,
//       comment,
//     });

//     await newRating.save();

//     // Update product's average rating and rating count
//     const product = await Product.findById(productId);
//     const allRatings = await Rating.find({ productId });
//     const averageRating =
//       allRatings.reduce((sum, r) => sum + r.rating, 0) / allRatings.length;

//     product.averageRating = averageRating;
//     product.ratingCount = allRatings.length;
//     await product.save();

//     res.status(201).json({ message: "Rating added successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Error adding rating" });
//   }
// };

// exports.getProductRatings = async (req, res) => {
//   try {
//     const { productId } = req.params;
//     const ratings = await Rating.find({ productId }).populate("userId", "name");
//     res.json(ratings);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching ratings" });
//   }
// };

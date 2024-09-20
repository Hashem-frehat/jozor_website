const express = require("express");
const router = express.Router();
const productController = require("../Controllers/productcontroller");

router.get("/", productController.getProducts);
router.post("/", productController.createProduct);
// router.post("/rate", productController.addRating);
// router.get("/:productId/ratings", productController.getProductRatings);

module.exports = router;

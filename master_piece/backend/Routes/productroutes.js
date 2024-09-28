const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.get("/partner/:id", productController.getPartnerProducts);
router.post("/", productController.addProduct);
router.put("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);

module.exports = router;

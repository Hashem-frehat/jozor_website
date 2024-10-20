const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

router.get("/partner/:id", productController.getPartnerProducts);
router.post("/", upload.single("photo"), productController.addProduct);
router.put("/:id", upload.single("photo"), productController.updateProduct);
router.delete("/:id", upload.single("photo"), productController.deleteProduct);

module.exports = router;

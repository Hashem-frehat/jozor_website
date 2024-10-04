const express = require("express");
const router = express.Router();
const addressController = require("../controllers/addressController");

router.get("/user/:userId", addressController.getAddressesByUserId);
router.post("/", addressController.addAddress);
router.put("/:id", addressController.updateAddress);
router.put("/activate/:id", addressController.activateAddress);
router.delete('/:id', addressController.deleteAddress);
module.exports = router;

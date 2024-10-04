const express = require("express");
const router = express.Router();
const plantController = require("../Controllers/plantController");

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("photo"), plantController.createPlant);
router.get("/", plantController.getAllPlants);

module.exports = router;

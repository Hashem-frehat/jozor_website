const express = require("express");
const router = express.Router();
const requestController = require("../Controllers/requestController");

router.post("/create", requestController.createRequest);

module.exports = router;

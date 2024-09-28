const express = require("express");
const router = express.Router();
const userController = require("../Controllers/usercontroler");

router.get("/:id", userController.getuser);
module.exports = router;

const express = require("express");
const router = express.Router();
const userController = require("../Controllers/usercontroler");

router.get("/:id", userController.getuser);
router.put("/:id", userController.updateUser);
module.exports = router;

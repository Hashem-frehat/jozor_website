const express = require("express");
const router = express.Router();
const adminController = require("../Controllers/adminController");

router.get("/users", adminController.getUsers);
router.post("/users/:id/toggle-active", adminController.toggleUserActive);
router.get("/partners", adminController.getPartners);
router.post("/partners/:id/toggle-active", adminController.togglePartnerActive);
router.get("/requests", adminController.getRequests);
router.post("/requests/:id/update", adminController.updateRequest);

module.exports = router;

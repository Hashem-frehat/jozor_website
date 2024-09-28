const express = require("express");
const router = express.Router();
const partnerController = require("../controllers/partnerController");

router.get("/:id", partnerController.getPartner);
router.get("/", partnerController.getallpartner);
router.put("/:id", partnerController.updatePartner);

module.exports = router;

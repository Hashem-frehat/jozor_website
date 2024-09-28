const express = require("express");
const router = express.Router();
const feedbackController = require("../Controllers/feedbackcontroler");

router.get("/:partnerId", feedbackController.getDoctorFeedback);
router.get("/stars/:partnerId", feedbackController.avgstars);
router.post("/", feedbackController.createFeedback);

module.exports = router;

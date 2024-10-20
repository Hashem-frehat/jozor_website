const express = require("express");
const router = express.Router();
const plantController = require("../Controllers/plantController");

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

// إضافة نبات جديد
router.post("/add", upload.single("photo"), plantController.createPlant);

// الحصول على جميع النباتات
router.get("/plant", plantController.getAllPlants);

// إضافة نبات إلى قائمة نباتاتي
router.post("/myplants", plantController.addToMyPlants);

// الحصول على نباتاتي بناءً على معرف المستخدم
router.get("/myplants/:userId", plantController.getMyPlants);

// إعداد تذكير للنبات
router.post("/reminder", plantController.setReminder);

// إلغاء تذكير للنبات
router.post("/cancel-reminder", plantController.cancelReminder); // إضافة هذا السطر
router.delete("/myplants/:plantId", plantController.removeFromMyPlants);

// Route to water a plant
router.post("/myplants/update-care", plantController.updatePlantCare);

module.exports = router;

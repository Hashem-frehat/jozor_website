const Plant = require("../Models/plants");
const MyPlant = require("../Models/myplants");
const User = require("../Models/users");
const nodemailer = require("nodemailer");

const cron = require("node-cron");

// إعداد البريد الإلكتروني
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

// وظيفة لإرسال البريد الإلكتروني
const sendEmailReminder = async (userEmail, plantName, reminderType) => {
  const subject = `تذكير برعاية النبات: ${plantName}`;
  const text = `حان موعد ${
    reminderType === "watering" ? "سقاية" : "تسميد"
  } نباتك ${plantName}!`;

  await transporter.sendMail({
    from: process.env.EMAIL,
    to: userEmail,
    subject,
    text,
  });
};

// جدولة إرسال التذكيرات
cron.schedule("*/1 * * * *", async () => {
  // كل دقيقة
  try {
    const myPlants = await MyPlant.find().populate("plantId");
    const now = new Date();

    for (const myPlant of myPlants) {
      const user = await User.findById(myPlant.userId);
      if (!user) continue; // إذا لم يكن المستخدم موجودًا، انتقل إلى النبات التالي

      // التحقق من تذكير السقاية
      const daysSinceLastWatered = Math.floor(
        (now - myPlant.nextWateringDate) / (1000 * 60 * 60 * 24)
      );
      if (daysSinceLastWatered >= myPlant.plantId.watering.frequency) {
        await sendEmailReminder(
          user.email,
          myPlant.plantId.plantName,
          "watering"
        );
        myPlant.nextWateringDate = new Date(
          now.getTime() +
            myPlant.plantId.watering.frequency * 24 * 60 * 60 * 1000
        );
      }

      // التحقق من تذكير التسميد
      const daysSinceLastFertilized = Math.floor(
        (now - myPlant.nextFertilizingDate) / (1000 * 60 * 60 * 24)
      );
      if (daysSinceLastFertilized >= myPlant.plantId.fertilizing.frequency) {
        await sendEmailReminder(
          user.email,
          myPlant.plantId.plantName,
          "fertilizing"
        );
        myPlant.nextFertilizingDate = new Date(
          now.getTime() +
            myPlant.plantId.fertilizing.frequency * 24 * 60 * 60 * 1000
        );
      }

      await myPlant.save(); // حفظ التحديثات
    }
  } catch (error) {
    console.error("Error in cron job:", error);
  }
});
exports.createPlant = async (req, res) => {
  try {
    const plantData = req.body;
    if (req.file) {
      plantData.photo = req.file.path;
    }
    const newPlant = new Plant(plantData);
    await newPlant.save();
    res.status(201).json(newPlant);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
exports.getAllPlants = async (req, res) => {
  try {
    const plants = await Plant.find(); // Fetching all plants
    res.status(200).json(plants);
  } catch (error) {
    console.error("Error fetching plants:", error); // Log the error
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.addToMyPlants = async (req, res) => {
  const { plantId, userId } = req.body;
  try {
    const plant = await Plant.findById(plantId);
    const newMyPlant = new MyPlant({
      plantId,
      userId,
      nextWateringDate: new Date(
        Date.now() + plant.watering.frequency * 24 * 60 * 60 * 1000
      ),
      nextFertilizingDate: new Date(
        Date.now() + plant.fertilizing.frequency * 24 * 60 * 60 * 1000
      ),
    });
    await newMyPlant.save();
    res.status(201).json(newMyPlant);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
exports.removeFromMyPlants = async (req, res) => {
  const { userId } = req.body;
  const { plantId } = req.params;

  try {
    // تحقق مما إذا كان النبات موجودًا بالفعل
    const existingPlant = await MyPlant.findOne({
      userId: userId,
      _id: plantId,
    });
    if (!existingPlant) {
      return res
        .status(404)
        .json({ message: "النبات غير موجود في قائمة نباتاتي." });
    }

    // حذف النبات
    await MyPlant.findOneAndDelete({
      userId: userId,
      _id: plantId,
    });

    return res.status(200).json({ message: "تم حذف النبات بنجاح." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "حدث خطأ أثناء حذف النبات." });
  }
};

exports.getMyPlants = async (req, res) => {
  try {
    const myPlants = await MyPlant.find({ userId: req.params.userId }).populate(
      "plantId"
    );
    res.json(myPlants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.setReminder = async (req, res) => {
  const { userId, plantId, reminderType, frequency } = req.body;

  try {
    const myPlant = await MyPlant.findOne({ userId, plantId });

    if (!myPlant) {
      return res.status(404).json({ message: "MyPlant not found" });
    }

    if (reminderType === "watering") {
      myPlant.wateringReminderActive = true;
    } else if (reminderType === "fertilizing") {
      myPlant.fertilizingReminderActive = true;
    } else {
      return res.status(400).json({ message: "Invalid reminder type" });
    }

    await myPlant.save();

    res.json({ message: "تم إعداد التذكير بنجاح!" });
  } catch (error) {
    console.error("Error setting reminder:", error);
    res.status(500).json({ message: error.message });
  }
};
// // الدالة لإلغاء التذكير
// let emailInterval; // لتخزين معرف الفاصل الزمني

// exports.setReminder = async (req, res) => {
//   const { userId, plantId, reminderType } = req.body;

//   try {
//     // Find the user and the specific plant associated with the user
//     const user = await User.findById(userId);
//     const myPlant = await MyPlant.findOne({ userId, plantId }).populate(
//       "plantId"
//     );

//     // Check if the user and plant exist
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     if (!myPlant) {
//       return res.status(404).json({ message: "MyPlant not found" });
//     }

//     // Create a transporter for sending emails
//     const transporter = nodemailer.createTransport({
//       service: "Gmail",
//       auth: {
//         user: process.env.EMAIL,
//         pass: process.env.PASSWORD,
//       },
//     });

//     // Set up email options
//     const mailOptions = {
//       from: process.env.EMAIL,
//       to: user.email,
//       subject: `تذكير برعاية النبات: ${myPlant.plantId.plantName}`,
//       text: `حان موعد ${reminderType === "watering" ? "سقاية" : "تسميد"} نباتك ${myPlant.plantId.plantName}!`,
//     };

//     // إرسال البريد الإلكتروني كل دقيقة
//     emailInterval = setInterval(async () => {
//       try {
//         await transporter.sendMail(mailOptions);
//         console.log("تم إرسال البريد الإلكتروني بنجاح");
//       } catch (error) {
//         console.error("خطأ في إرسال البريد الإلكتروني:", error);
//       }
//     }, 60000); // كل دقيقة

//     res.json({ message: "تم إعداد التذكير بنجاح" });
//   } catch (error) {
//     console.error("خطأ في إعداد التذكير:", error);
//     res.status(500).json({ message: error.message });
//   }
// };

// الدالة لإلغاء التذكير
exports.cancelReminder = async (req, res) => {
  const { userId, plantId, reminderType } = req.body;

  try {
    const myPlant = await MyPlant.findOne({ userId, plantId });

    if (!myPlant) {
      return res.status(404).json({ message: "MyPlant not found" });
    }

    if (reminderType === "watering") {
      myPlant.wateringReminderActive = false;
    } else if (reminderType === "fertilizing") {
      myPlant.fertilizingReminderActive = false;
    } else {
      return res.status(400).json({ message: "Invalid reminder type" });
    }

    await myPlant.save();

    res.json({ message: "تم إلغاء التذكير بنجاح!" });
  } catch (error) {
    console.error("Error cancelling reminder:", error);
    res.status(500).json({ message: error.message });
  }
};
exports.updatePlantCare = async (req, res) => {
  try {
    const { userId, plantId, careType } = req.body;

    const updateField = careType === "water" ? "lastWatered" : "lastFertilized";
    const nextDateField =
      careType === "water" ? "nextWateringDate" : "nextFertilizingDate";

    const plant = await MyPlant.findOne({ userId, plantId }).populate(
      "plantId"
    );

    if (!plant) {
      return res.status(404).json({ message: "Plant not found" });
    }

    const now = new Date();
    plant[updateField] = now;

    // Calculate next care date based on frequency
    const frequencyDays =
      careType === "water"
        ? plant.plantId.watering.frequency
        : plant.plantId.fertilizing.frequency;
    plant[nextDateField] = new Date(
      now.getTime() + frequencyDays * 24 * 60 * 60 * 1000
    );

    await plant.save();

    res.status(200).json({ message: "Plant care updated successfully", plant });
  } catch (error) {
    console.error("Error updating plant care:", error);
    res
      .status(500)
      .json({ message: "Error updating plant care", error: error.message });
  }
};

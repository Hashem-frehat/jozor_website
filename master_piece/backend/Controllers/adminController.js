const User = require("../Models/users");
const Partner = require("../Models/partners");
const Request = require("../Models/requests");
const nodemailer = require("nodemailer");

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({}, "-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.toggleUserActive = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    user.isactive = !user.isactive;
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPartners = async (req, res) => {
  try {
    const partners = await Partner.find({}, "-password");
    res.json(partners);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.togglePartnerActive = async (req, res) => {
  try {
    const partner = await Partner.findById(req.params.id);
    partner.isactive = !partner.isactive;
    await partner.save();
    res.json(partner);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getRequests = async (req, res) => {
  try {
    const requests = await Request.find().populate("userId", "email");
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.updateRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const { price, messegefromadmin } = req.body;

    console.log(
      `Updating request ${id} with price: ${price} and message: ${messegefromadmin}`
    );

    const request = await Request.findByIdAndUpdate(
      id,
      { price, messegefromadmin },
      { new: true }
    ).populate("userId", "email");

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    console.log("Request updated successfully:", request);

    // Configure nodemailer transporter
    let transporter = nodemailer.createTransport({
      host: "smtp.office365.com", // استخدم الخادم الصحيح لـ Outlook
      port: 587,
      secure: false, // استخدام TLS
      auth: {
        user: "jozojozo123123@outlook.com", // بريدك الإلكتروني
        pass: "jozojozo123", // كلمة المرور (أو كلمة مرور التطبيق)
      },
    });

    // Send email to user
    try {
      let info = await transporter.sendMail({
        from: "jozojozo123123@outlook.com",
        to: request.userId.email,
        subject: "Request Update",
        text: `Your request has been updated. Price: ${price}, Message: ${messegefromadmin}`,
      });

      console.log("Email sent:", info.messageId);
    } catch (emailError) {
      console.error("Error sending email:", emailError);
    }

    res.json({ message: "Request updated successfully", request });
  } catch (error) {
    console.error("Error updating request:", error);
    res.status(500).json({ message: error.message });
  }
};

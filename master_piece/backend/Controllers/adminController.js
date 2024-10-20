const User = require("../Models/users");
const Partner = require("../Models/partners");
const Request = require("../Models/requests");
const nodemailer = require("nodemailer");

// async function sendEmail(to, subject, html) {
//   const transporter = nodemailer.createTransport({
//     service: "outlook",
//     auth: {
//       user: "jozojozo123123@outlook.com",
//       pass: "jozojozo123",
//     },
//   });

//   const mailOptions = {
//     from: "jozojozo123123@outlook.com",
//     to,
//     subject,
//     html,
//   };

//   try {
//     const info = await transporter.sendMail(mailOptions);
//     console.log("Email sent: " + info.response);
//   } catch (err) {
//     console.error("Error sending email: " + err.message);
//     throw err;
//   }
// }

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

    const request = await Request.findByIdAndUpdate(
      id,
      { price, messegefromadmin },
      { new: true }
    ).populate("userId", "email");

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    console.log("Request updated successfully:", request);

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: request.userId.email, // Send to the provided email
      subject: "Request Update ",
      text: `Your request has been updated. Price: ${price}, Message: ${messegefromadmin}`,
    };

    // إرسال البريد الإلكتروني
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.error("Error sending email:", error);
        return res.status(500).json({ error: "Error sending email" });
      } else {
        console.log("Email sent:", info.response);
        return res.json({
          message: "Request updated and email sent successfully",
          request,
        });
      }
    });
  } catch (error) {
    console.error("Error updating request:", error);
    return res.status(500).json({ message: error.message });
  }
};

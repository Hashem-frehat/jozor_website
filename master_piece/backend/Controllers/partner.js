const partners = require("../Models/partners");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await partners.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    if (!user.isactive) {
      return res.status(403).json({ message: "Your subscription has expired" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.cookie("token", token, {
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600000, // ساعة واحدة
    });
    res.status(200).json({ message: "Login successful!" });
  } catch (error) {
    res.status(500).json({ message: "Failed to login", error });
  }
};

exports.signup = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      phoneNumber,
      email,
      password,
      businessType,
      catigory,
      storeName,
      address,
    } = req.body;

    // Check if user already exists
    const existingUser = await partners.findOne({
      $or: [{ email }, { phoneNumber }],
    });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists with this email or phone number",
      });
    }

    // Encrypt the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user with encrypted password
    const newUser = new partners({
      firstName,
      lastName,
      phoneNumber,
      email,
      password: hashedPassword, // Use hashed password here
      businessType,
      catigory,
      storeName,
      address,
    });

    await newUser.save();

    // Create JWT token
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // Set token in cookie
    res.cookie("token", token, {
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600000, // ساعة واحدة
    });

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const Request = require("../Models/requests");
const User = require("../Models/users");
exports.createRequest = async (req, res) => {
  try {
    const { address, description, time, date, userId } = req.body;

    // Fetch user data
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newRequest = new Request({
      address,
      description,
      time,
      date,
      userId,
    });

    await newRequest.save();

    res.status(201).json({
      message: "Request created successfully",
    });
  } catch (error) {
    console.error("Error details: ", error); // Add this line to log the error
    res
      .status(500)
      .json({ message: "Error creating request", error: error.message });
  }
};

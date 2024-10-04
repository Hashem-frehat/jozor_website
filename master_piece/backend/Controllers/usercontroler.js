const Partner = require("../Models/users");

exports.getuser = async (req, res) => {
  try {
    const partner = await Partner.findById(req.params.id).select("-password");
    if (!partner) {
      return res.status(404).json({ message: "Partner not found" });
    }
    res.json(partner);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { firstName, lastName, email, phoneNumber } = req.body;
    const user = await Partner.findByIdAndUpdate(
      req.params.id,
      { firstName, lastName, email, phoneNumber },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

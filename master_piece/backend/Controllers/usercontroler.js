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

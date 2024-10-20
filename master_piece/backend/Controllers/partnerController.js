const Partner = require("../Models/partners");

exports.getPartner = async (req, res) => {
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
exports.getallpartner = async (req, res) => {
  try {
    const allpartner = await Partner.find();
    res.json(allpartner);
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
};
exports.updatePartner = async (req, res) => {
  try {
    const updatedPartner = await Partner.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).select("-password");
    res.json(updatedPartner);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const Address = require("../Models/address");
const User = require("../Models/users");

exports.getAddressesByUserId = async (req, res) => {
  try {
    const addresses = await Address.find({
      userId: req.params.userId,
    }).populate("userId", "phoneNumber");

    if (!addresses.length) {
      return res
        .status(404)
        .json({ message: "No addresses found for this user" });
    }

    const userDetails = {
      phoneNumber: addresses[0].userId.phoneNumber,
      addresses: addresses.map((addr) => ({
        _id: addr._id,
        addressName: addr.addressName,
        address: addr.address,
        isactive: addr.isactive,
      })),
    };

    res.status(200).json(userDetails);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.addAddress = async (req, res) => {
  try {
    const { userId, addressName, address, location } = req.body;

    const addressCount = await Address.countDocuments({ userId });
    if (addressCount >= 3) {
      return res
        .status(400)
        .json({ message: "تم الوصول إلى الحد الأقصى لعدد العناوين" });
    }

    const newAddress = new Address({ userId, addressName, address, location });
    await newAddress.save();
    res.status(201).json(newAddress);
  } catch (error) {
    res.status(500).json({ message: "خطأ في الخادم", error: error.message });
  }
};

exports.updateAddress = async (req, res) => {
  try {
    const { addressName, address } = req.body;
    const updatedAddress = await Address.findByIdAndUpdate(
      req.params.id,
      { addressName, address },
      { new: true }
    );
    if (!updatedAddress) {
      return res.status(404).json({ message: "Address not found" });
    }
    res.status(200).json(updatedAddress);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.activateAddress = async (req, res) => {
  try {
    const address = await Address.findById(req.params.id);
    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }

    // Deactivate all addresses for the user
    await Address.updateMany({ userId: address.userId }, { isactive: false });

    // Activate the selected address
    address.isactive = true;
    await address.save();

    res.status(200).json(address);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.deleteAddress = async (req, res) => {
  try {
    const deletedAddress = await Address.findByIdAndDelete(req.params.id);
    if (!deletedAddress) {
      return res.status(404).json({ message: "Address not found" });
    }
    res.status(200).json({ message: "Address deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const Backer = require("../models/Backer");

// Get backer profile by email
const getBackerProfile = async (req, res) => {
  try {
    const { email } = req.params;
    const backer = await Backer.findOne({ email });
    if (!backer) {
      return res.status(404).json({ message: "Backer not found" });
    }
    res.status(200).json(backer);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch backer profile", error: error.message });
  }
};

// Update backer profile
const updateBackerProfile = async (req, res) => {
  try {
    const { email } = req.params;
    const { name, bio, phone, address, profilePicture } = req.body;

    const updatedBacker = await Backer.findOneAndUpdate(
      { email },
      { name, bio, phone, address, profilePicture },
      { new: true } // Return the updated document
    );

    if (!updatedBacker) {
      return res.status(404).json({ message: "Backer not found" });
    }

    res.status(200).json(updatedBacker);
  } catch (error) {
    res.status(500).json({ message: "Failed to update backer profile", error: error.message });
  }
};

module.exports = { getBackerProfile, updateBackerProfile };
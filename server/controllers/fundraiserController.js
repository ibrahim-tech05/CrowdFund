const Fundraiser = require("../models/Fundraiser");

// Get fundraiser profile by email
const getFundraiserProfile = async (req, res) => {
  try {
    const { email } = req.params;
    const fundraiser = await Fundraiser.findOne({ email });
    if (!fundraiser) {
      return res.status(404).json({ message: "Fundraiser not found" });
    }
    res.status(200).json(fundraiser);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch fundraiser profile", error: error.message });
  }
};

// Update fundraiser profile
const updateFundraiserProfile = async (req, res) => {
  try {
    const { email } = req.params;
    const { organizationName, mission, website, phone, address, profilePicture } = req.body;

    const updatedFundraiser = await Fundraiser.findOneAndUpdate(
      { email },
      { organizationName, mission, website, phone, address, profilePicture },
      { new: true } // Return the updated document
    );

    if (!updatedFundraiser) {
      return res.status(404).json({ message: "Fundraiser not found" });
    }

    res.status(200).json(updatedFundraiser);
  } catch (error) {
    res.status(500).json({ message: "Failed to update fundraiser profile", error: error.message });
  }
};

module.exports = { getFundraiserProfile, updateFundraiserProfile };
const Campaign = require("../models/Campaign");

// Create a new campaign
const createCampaign = async (req, res) => {
  try {
    const { title, description, image, progress, goal, type, isBookmarked, email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is mandatory" });
    }

    if (!description) {
      return res.status(400).json({ message: "Description is required" });
    }

    const newCampaign = new Campaign({
      title,
      description,
      image,
      progress,
      goal,
      type,
      isBookmarked,
      email,
    });

    const savedCampaign = await newCampaign.save();
    res.status(201).json(savedCampaign);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all campaigns
const getCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find();
    res.status(200).json(campaigns);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single campaign by ID
const getCampaignById = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) {
      return res.status(404).json({ message: "Campaign not found" });
    }
    res.status(200).json(campaign);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a campaign by ID
const updateCampaign = async (req, res) => {
  try {
    const { title, description, image, progress, goal, type, isBookmarked, email } = req.body;

    const updatedCampaign = await Campaign.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        image,
        progress,
        goal,
        type,
        isBookmarked,
        email,
      },
      { new: true }
    );

    if (!updatedCampaign) {
      return res.status(404).json({ message: "Campaign not found" });
    }

    res.status(200).json(updatedCampaign);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a campaign by ID
const deleteCampaign = async (req, res) => {
  try {
    const deletedCampaign = await Campaign.findByIdAndDelete(req.params.id);
    if (!deletedCampaign) {
      return res.status(404).json({ message: "Campaign not found" });
    }
    res.status(200).json({ message: "Campaign deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get campaigns by email
const getCampaignsByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const campaigns = await Campaign.find({ email });
    res.status(200).json(campaigns);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const toggleBookmark = async (req, res) => {
  try {
    const { campaignId, email } = req.body;

    if (!campaignId || !email) {
      return res.status(400).json({ message: "Campaign ID and email are required" });
    }

    const campaign = await Campaign.findById(campaignId);
    if (!campaign) {
      return res.status(404).json({ message: "Campaign not found" });
    }

    // Check if the user has already bookmarked the campaign
    const isBookmarked = campaign.isBookmarked.includes(email);

    if (isBookmarked) {
      // Unbookmark: Remove the email from the array
      campaign.isBookmarked = campaign.isBookmarked.filter((e) => e !== email);
    } else {
      // Bookmark: Add the email to the array
      campaign.isBookmarked.push(email);
    }

    const updatedCampaign = await campaign.save();
    res.status(200).json(updatedCampaign);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Get saved campaigns by email
const getSavedCampaignsByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // Find campaigns where the email is in the isBookmarked array
    const savedCampaigns = await Campaign.find({ isBookmarked: email });
    res.status(200).json(savedCampaigns);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const updateRaisedFund = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount } = req.body;

    const campaign = await Campaign.findById(id);
    if (!campaign) return res.status(404).json({ message: "Campaign not found" });

    campaign.raisedFund += amount;
    await campaign.save();
    
    res.status(200).json(campaign);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateCampaignStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Validate status input
    if (!["active", "inactive"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const updatedCampaign = await Campaign.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedCampaign) {
      return res.status(404).json({ message: "Campaign not found" });
    }

    res.status(200).json(updatedCampaign);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add this to your existing exports
module.exports = {
  createCampaign,
  getCampaigns,
  getCampaignById,
  updateCampaign,
  deleteCampaign,
  getCampaignsByEmail,
  getSavedCampaignsByEmail,
  toggleBookmark,
  updateRaisedFund,
  updateCampaignStatus, // Add this
};

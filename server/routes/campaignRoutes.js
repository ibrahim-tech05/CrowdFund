const express = require("express");
const {
  createCampaign,
  getCampaigns,
  getCampaignById,
  updateCampaign,
  deleteCampaign,
  getCampaignsByEmail,
  toggleBookmark,
  getSavedCampaignsByEmail,
  updateRaisedFund,
  updateCampaignStatus, // Ensure this is imported
} = require("../controllers/campaignController");


const router = express.Router();

// Create a new campaign
router.post("/", createCampaign);

// Get all campaigns
router.get("/", getCampaigns);

// Get a single campaign by ID
router.get("/:id", getCampaignById);

// Update a campaign by ID
router.put("/:id", updateCampaign);
router.put("/:id/status", updateCampaignStatus);

// Delete a campaign by ID
router.delete("/:id", deleteCampaign);

// Get campaigns by email (created by a specific user)
router.get("/email/:email", getCampaignsByEmail);

// Bookmark/Unbookmark a campaign
router.post("/bookmark", toggleBookmark);

// Get saved campaigns by email (bookmarked by a specific user)
router.get("/saved/:email", getSavedCampaignsByEmail);
router.get("/raiseFund", updateRaisedFund);

module.exports = router;
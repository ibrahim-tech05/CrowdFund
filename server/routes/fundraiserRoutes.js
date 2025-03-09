const express = require("express");
const { getFundraiserProfile, updateFundraiserProfile } = require("../controllers/fundraiserController");

const router = express.Router();

// Get fundraiser profile by email
router.get("/:email", getFundraiserProfile);

// Update fundraiser profile
router.put("/:email", updateFundraiserProfile);

module.exports = router;
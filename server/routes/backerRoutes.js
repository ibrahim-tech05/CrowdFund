const express = require("express");
const { getBackerProfile, updateBackerProfile } = require("../controllers/backerController");

const router = express.Router();

// Get backer profile by email
router.get("/:email", getBackerProfile);

// Update backer profile
router.put("/:email", updateBackerProfile);

module.exports = router;
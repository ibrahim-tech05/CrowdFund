const express = require("express");
const {
  createSuccessStory,
  getSuccessStoriesByEmail,
  deleteSuccessStory,
  getAllStories
} = require("../controllers/successStoryController");

const router = express.Router();

router.get("/", getAllStories);
router.post("/", createSuccessStory);
router.get("/email/:email", getSuccessStoriesByEmail);
router.delete("/:id", deleteSuccessStory);

module.exports = router;
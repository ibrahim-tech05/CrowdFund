const { get } = require("mongoose");
const SuccessStory = require("../models/SuccessStory");

const createSuccessStory = async (req, res) => {
  try {
    const { title, image, description, email } = req.body;

    const newSuccessStory = new SuccessStory({
      title,
      image,
      description,
      email, // Add email field
    });

    const savedSuccessStory = await newSuccessStory.save();
    res.status(201).json(savedSuccessStory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getSuccessStoriesByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const stories = await SuccessStory.find({ email });
    res.status(200).json(stories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const deleteSuccessStory = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedStory = await SuccessStory.findByIdAndDelete(id);
    if (!deletedStory) {
      return res.status(404).json({ message: "Story not found" });
    }
    res.status(200).json({ message: "Story deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getAllStories = async (req, res) => {
  try {
    const stories = await SuccessStory.find();
    res.status(200).json(stories);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
module.exports = {
  createSuccessStory,
  getSuccessStoriesByEmail,
  deleteSuccessStory,
  getAllStories,
};
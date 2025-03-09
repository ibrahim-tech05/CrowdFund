const mongoose = require("mongoose");

const SuccessStorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true,
    maxlength: [120, "Title cannot exceed 120 characters"],
  },
  image: {
    type: String,
    required: [true, "Image is required"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
    trim: true,
    minlength: [100, "Description should be at least 100 characters"],
    maxlength: [2000, "Description cannot exceed 2000 characters"],
  },
  email: { type: String, required: true }
});

module.exports = mongoose.model("SuccessStory", SuccessStorySchema);
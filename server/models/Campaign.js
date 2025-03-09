const mongoose = require("mongoose");

const CampaignSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, default: "https://via.placeholder.com/400x200" },
  goal: { type: Number, required: true },
  type: { type: String },
  isBookmarked: { type: [String], default: [] },
  email: { type: String, required: true },
  raisedFund: { type: Number, default: 0 },
  status: { type: String, enum: ["active", "inactive"], default: "active" }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

CampaignSchema.virtual("progress").get(function() {
  return Math.min(Math.round((this.raisedFund / this.goal) * 100), 100);
});

module.exports = mongoose.model("Campaign", CampaignSchema);
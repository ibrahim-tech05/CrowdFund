const mongoose = require("mongoose");

const FundraiserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true }, // Linked to the user's email
  organizationName: { type: String, required: true }, // Name of the organization
  mission: { type: String, required: false }, // Mission statement
  website: { type: String, default: "" }, // Website URL
  phone: { type: String, default: "" }, // Contact phone number
  address: { type: String, default: "" }, // Address of the organization
  profilePicture: { type: String, default: "" }, // Cloudinary URL for profile picture
  totalFundsRaised: { type: Number, default: 0 }, // Total funds raised
});

module.exports = mongoose.model("Fundraiser", FundraiserSchema);
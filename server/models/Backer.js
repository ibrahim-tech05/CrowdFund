const mongoose = require("mongoose");

const BackerSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true }, // Unique email for each backer
  name: { type: String, required: true },
  profilePicture: { type: String, default: "" }, // Cloudinary URL
  totalDonations: { type: Number, default: 0 }, // Total donations made by the backer
  bio: { type: String, default: "" }, // Optional bio
  phone: { type: String, default: "" }, // Optional phone number
  address: { type: String, default: "" }, // Optional address
});

module.exports = mongoose.model("Backer", BackerSchema);
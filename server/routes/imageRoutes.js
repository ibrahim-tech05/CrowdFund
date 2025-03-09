const express = require("express");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");
require("dotenv").config(); // Ensure dotenv is loaded

const router = express.Router();

// ✅ Ensure Cloudinary is properly configured
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "missing_cloud_name",
  api_key: process.env.CLOUDINARY_API_KEY || "missing_api_key",
  api_secret: process.env.CLOUDINARY_API_SECRET || "missing_api_secret",
});

// Multer setup for file upload (stores in memory)
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image provided" });
    }

    const streamUpload = (file) => {
      return new Promise((resolve, reject) => {
        let stream = cloudinary.uploader.upload_stream({ folder: "crowdfund" }, (error, result) => {
          if (result) resolve(result);
          else reject(error);
        });
        streamifier.createReadStream(file.buffer).pipe(stream);
      });
    };

    const uploadResponse = await streamUpload(req.file);
    res.status(200).json({ imageUrl: uploadResponse.secure_url });
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({ message: "Image upload failed", error: error.message });
  }
});

module.exports = router;

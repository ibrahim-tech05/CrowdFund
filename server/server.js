require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const campaignRoutes = require("./routes/campaignRoutes");
const successStoryRoutes = require("./routes/successStoryRoutes");
const contactRoutes = require("./routes/contactRoutes");
const imageRoutes = require("./routes/imageRoutes");
const backerRoutes = require("./routes/backerRoutes");
const fundraiserRoutes = require("./routes/fundraiserRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173", // Allow requests from frontend
    credentials: true,
  })
);
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/campaigns", campaignRoutes);
app.use("/api/success-stories", successStoryRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/images", imageRoutes); // Fixed API route
app.use("/api/backers", backerRoutes);
app.use("/api/fundraisers", fundraiserRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/admin", userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

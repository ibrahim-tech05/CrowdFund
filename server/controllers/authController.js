const User = require("../models/User");
const Fundraiser = require("../models/Fundraiser");
const jwt = require("jsonwebtoken");
const Backer = require("../models/Backer")

// Register a new user
const register = async (req, res) => {
  const { name, email, password, role } = req.body;

  // Check if the role is valid (admin cannot register via this API)
  if (role === "admin") {
    return res.status(400).json({ message: "Admin registration is not allowed" });
  }

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Create a new user
    const user = new User({ name, email, password, role });
    await user.save();

    // If the role is "fundraiser", create a fundraiser profile
    if (role === "fundraiser") {
      const fundraiser = new Fundraiser({
        email,
        organizationName: name, // Use the user's name as the organization name by default
        mission: "", // Default empty mission
        website: "", // Default empty website
        phone: "", // Default empty phone
        address: "", // Default empty address
        profilePicture: "", // Default empty profile picture
        totalFundsRaised: 0, // Default total funds raised
      });
      await fundraiser.save();
    }
    if (role === "backer") {
      const backer = new Backer({
        email,
        name,
        profilePicture:"",
        totalDonations:0,
        bio:"",
        phone:"",
        address:""
      })
      await backer.save();
    }

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare the password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      role: user.role,
      email: user.email,
      name:user.name
    });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
};

module.exports = { register, login };
const express = require("express");
const { getAllUsers, deleteUser } = require("../controllers/userController");

const router = express.Router();

router.get("/users", getAllUsers); // Get all users
router.delete("/users/:id", deleteUser); // Delete user by ID

module.exports = router;

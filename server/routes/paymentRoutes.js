const express = require("express");
const { processPayment, getPayments } = require("../controllers/paymentController");

const router = express.Router();

// Route to process payment
router.post("/process", processPayment);

// Route to get all payments
router.get("/", getPayments);

module.exports = router;

const Payment = require("../models/Payment");
const Campaign = require("../models/Campaign");

// Process payment
const processPayment = async (req, res) => {
  const { campaignId, amount,email } = req.body;


  try {
    // Validate input
    if (!campaignId || !amount || !email) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    // Find the campaign
    const campaign = await Campaign.findById(campaignId);
    if (!campaign) {
      return res.status(404).json({ success: false, message: "Campaign not found" });
    }

    // Update campaign's raised funds
    campaign.raisedFund += parseFloat(amount);
    await campaign.save();

    // Save payment details
    const payment = new Payment({
      campaignId,
      email,
      amount,
    });
    await payment.save();

    res.status(200).json({ success: true, message: "Payment successful" });
  } catch (error) {
    console.error("Payment error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const getPayments = async (req, res) => {
    try {
      const payments = await Payment.find().populate("campaignId", "title"); // Ensure title is included
      console.log("Payments from DB:", payments);
      res.status(200).json({ success: true, data: payments });
    } catch (error) {
      console.error("Error fetching payments:", error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  };
module.exports = { processPayment, getPayments };

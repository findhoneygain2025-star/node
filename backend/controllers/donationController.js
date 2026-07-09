const Razorpay = require("razorpay");

const createDonationOrder = async (req, res) => {
  try {
    const { amount } = req.body; // Amount in INR

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: "Invalid donation amount" });
    }

    // Initialize Razorpay instance with Test Keys
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
      amount: Number(amount) * 100, // Razorpay takes amount in paise (₹10 = 1000 paise)
      currency: "INR",
      receipt: `donation_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    res.status(200).json(order);
  } catch (error) {
    console.error("Razorpay order error:", error);
    res.status(500).json({ message: "Failed to create order", error: error.message });
  }
};
module.exports = {createDonationOrder}
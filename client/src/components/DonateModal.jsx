import React, { useState } from "react";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL;
const RAZORPAY_KEY = import.meta.env.VITE_RAZORPAY_KEY_ID;

const DonateModal = ({ isOpen, onClose }) => {
  const [customAmount, setCustomAmount] = useState(100);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async (amountToPay) => {
    setLoading(true);
    const scriptLoaded = await loadRazorpayScript();

    if (!scriptLoaded) {
      alert("Razorpay SDK failed to load. Are you connected to the internet?");
      setLoading(false);
      return;
    }

    try {
      const { data: order } = await axios.post(`${API_BASE}/api/donation/order`, {
        amount: amountToPay,
      });

      const options = {
        key: RAZORPAY_KEY,
        amount: order.amount,
        currency: order.currency,
        name: "Blogify",
        description: "Support Blogify Creators",
        order_id: order.id,
        handler: function (response) {
          alert(`🎉 Thank you for donating ₹${amountToPay}! Payment ID: ${response.razorpay_payment_id}`);
          onClose();
        },
        prefill: {
          name: "Blogify Supporter",
          email: "supporter@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#007bff",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (err) {
      console.error("Payment error:", err);
      alert("Failed to initiate donation payment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black font-bold text-xl"
        >
          ✕
        </button>

        <h3 className="text-2xl font-bold text-center text-gray-800 mb-2">
          Support Blogify ❤️
        </h3>
        <p className="text-sm text-gray-500 text-center mb-6">
          Help us keep creating high-quality content. Choose an amount to donate.
        </p>

        {/* Quick Amount Options */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          {[50, 100, 500].map((amt) => (
            <button
              key={amt}
              onClick={() => handlePayment(amt)}
              disabled={loading}
              className="bg-blue-50 hover:bg-blue-600 hover:text-white border border-blue-200 font-semibold py-2 rounded-xl transition"
            >
              ₹{amt}
            </button>
          ))}
        </div>

        {/* Custom Amount Form */}
        <div className="mt-4">
          <label className="text-xs font-semibold text-gray-600 mb-1 block">
            Or Enter Custom Amount (₹)
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              value={customAmount}
              onChange={(e) => setCustomAmount(e.target.value)}
              min="1"
              className="border border-gray-300 rounded-xl px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={() => handlePayment(customAmount)}
              disabled={loading || !customAmount}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2 rounded-xl transition disabled:bg-gray-400"
            >
              {loading ? "Processing..." : "Donate"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonateModal;
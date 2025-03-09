import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const PaymentPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const email = localStorage.getItem("email");

  const handlePayment = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/payments/process", {
        campaignId: id,
        amount: parseFloat(amount),
        email: email,
      });
      if (response.data.success) {
        setMessage("Payment successful! Thank you for your donation.");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        setMessage("Payment failed. Please try again.");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-indigo-600">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h1 className="mb-6 text-3xl font-bold text-center text-gray-800">Donate Now</h1>
        <form onSubmit={handlePayment} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Amount (USD)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Donate
          </button>
        </form>
        {message && (
          <div className="mt-4 text-sm text-center text-gray-600">
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentPage;
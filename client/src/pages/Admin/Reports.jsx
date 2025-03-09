import React, { useEffect, useRef ,useState} from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { motion } from 'framer-motion';
import { Chart, registerables } from 'chart.js';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

Chart.register(...registerables);

const Reports = () => {
  const [paymentData, setPaymentData] = useState([]);

  useEffect(() => {
    const fetchPaymentData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/payments");
        console.log("API Response:", response.data);
        setPaymentData(Array.isArray(response.data.data) ? response.data.data : []);
      } catch (error) {
        toast.error("Failed to load payment data", { position: "bottom-right", autoClose: 3000 });
      }
    };
    fetchPaymentData();
  }, []);

  // Process Data for Bar Chart
  const campaignDonations = paymentData.reduce((acc, payment) => {
    if (!payment.campaignId || !payment.campaignId.title) return acc; // Skip if no title

    let campaignTitle = payment.campaignId.title; // Use title instead of ID
    acc[campaignTitle] = (acc[campaignTitle] || 0) + (payment.amount || 0);

    return acc;
  }, {});

  // Bar Chart Data
  const barChartData = {
    labels: Object.keys(campaignDonations),
    datasets: [
      {
        label: "Donations per Campaign",
        data: Object.values(campaignDonations),
        backgroundColor: "rgba(99, 102, 241, 0.8)",
        borderColor: "rgba(79, 70, 229, 1)",
        borderWidth: 2,
      },
    ],
  };
  const totalDonations = paymentData.reduce((sum, payment) => sum + (payment.amount || 0), 0);

  // Calculate Average Donation
  const averageDonation = paymentData.length > 0 ? totalDonations / paymentData.length : 0;
  
  // Process Data for Line Chart (Trends Over Time)
  const processChartData = () => {
    const dailyDonations = paymentData.reduce((acc, payment) => {
      const date = new Date(payment.date).toLocaleDateString();
      acc[date] = (acc[date] || 0) + payment.amount;
      return acc;
    }, {});
  
    return {
      labels: Object.keys(dailyDonations),
      datasets: [
        {
          label: "Daily Donations",
          data: Object.values(dailyDonations),
          borderColor: "rgba(75,192,192,1)",
          backgroundColor: "rgba(75,192,192,0.2)",
          borderWidth: 2,
          tension: 0.3,
        },
      ],
    };
  };
  

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-r from-[#1a1a2e] to-[#16213e] text-white p-8 "
    >
      <div className="mx-auto max-w-7xl">
        <motion.h1
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="mb-8 text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500"
        >
          Payment Analytics Dashboard
        </motion.h1>

        <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-3">
          <motion.div whileHover={{ scale: 1.05 }} className="p-6 shadow-2xl bg-white/10 rounded-xl backdrop-blur-lg">
            <h3 className="mb-2 text-xl font-semibold text-purple-400">Total Donations</h3>
            <p className="text-3xl font-bold">${totalDonations.toLocaleString()}</p>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} className="p-6 shadow-2xl bg-white/10 rounded-xl backdrop-blur-lg">
            <h3 className="mb-2 text-xl font-semibold text-blue-400">Average Donation</h3>
            <p className="text-3xl font-bold">${averageDonation.toFixed(2)}</p>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} className="p-6 shadow-2xl bg-white/10 rounded-xl backdrop-blur-lg">
            <h3 className="mb-2 text-xl font-semibold text-green-400">Total Transactions</h3>
            <p className="text-3xl font-bold">{paymentData.length}</p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 mb-8 shadow-2xl bg-white/10 rounded-xl backdrop-blur-lg"
        >
          <h3 className="mb-4 text-xl font-semibold text-center">Donation Trends</h3>
          <div className="h-96">
            <Line data={processChartData()} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 shadow-2xl bg-white/10 rounded-xl backdrop-blur-lg"
        >
          <h3 className="mb-4 text-xl font-semibold text-center">Campaign Donations</h3>
          <div className="h-96">
            <Bar data={barChartData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Reports;

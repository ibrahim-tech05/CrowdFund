import React, { useEffect, useState } from "react";
import { getCampaigns, getCampaignsByEmail } from "../../api/campaign";
import { motion } from "framer-motion";
import { Line, Bar, Pie } from "react-chartjs-2";
import Chart from 'chart.js/auto';

const FundraiserDashboard = () => {
  const [totalCampaigns, setTotalCampaigns] = useState(0);
  const [totalFundsRaised, setTotalFundsRaised] = useState(0);
  const [userCampaigns, setUserCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  const email = localStorage.getItem("email");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const campaigns = await getCampaigns();
        const userCampaigns = await getCampaignsByEmail(email);

        // Filter active campaigns
        const activeCampaigns = userCampaigns.filter(campaign => campaign.status === "active");

        setTotalCampaigns(activeCampaigns.length); // Count only active campaigns
        setTotalFundsRaised(activeCampaigns.reduce((sum, c) => sum + (c.raisedFund || 0), 0)); // Sum only active campaigns
        setUserCampaigns(activeCampaigns); // Set only active campaigns
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, [email]);

  // Chart data calculations (only for active campaigns)
  const campaignTypesData = userCampaigns.reduce((acc, campaign) => {
    acc[campaign.type] = (acc[campaign.type] || 0) + campaign.raisedFund;
    return acc;
  }, {});

  const campaignProgressData = userCampaigns.map(campaign => ({
    label: campaign.title,
    goal: campaign.goal,
    raised: campaign.raisedFund
  }));

  if (loading) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex items-center justify-center bg-[#f6f6f6]"
      >
        <div className="w-12 h-12 border-t-2 border-b-2 border-[#1a1a2e] rounded-full animate-spin"></div>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f6f6f6] text-[#1a1a2e] p-8 mt-[80px]">
      <h1 className="mb-8 text-3xl font-bold">Fundraiser Dashboard</h1>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="p-6 bg-white shadow-lg rounded-xl"
        >
          <h2 className="mb-4 text-xl font-bold">Total Funds Raised</h2>
          <div className="text-3xl font-bold text-[#1a1a2e]">
            ${totalFundsRaised.toLocaleString()}
          </div>
        </motion.div>

        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="p-6 bg-white shadow-lg rounded-xl"
        >
          <h2 className="mb-4 text-xl font-bold">Active Campaigns</h2>
          <div className="text-3xl font-bold text-[#1a1a2e]">
            {totalCampaigns} {/* Display count of active campaigns */}
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 gap-8 mt-12 lg:grid-cols-2">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 bg-white shadow-lg rounded-xl"
        >
          <h3 className="mb-6 text-xl font-bold">Funds Distribution by Type</h3>
          <div className="h-64">
            <Pie
              data={{
                labels: Object.keys(campaignTypesData),
                datasets: [{
                  data: Object.values(campaignTypesData),
                  backgroundColor: [
                    '#1a1a2e', '#16213e', '#0f3460', '#533483'
                  ],
                  hoverOffset: 4
                }]
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false
              }}
            />
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 bg-white shadow-lg rounded-xl"
        >
          <h3 className="mb-6 text-xl font-bold">Campaign Progress</h3>
          <div className="h-64">
            <Bar
              data={{
                labels: campaignProgressData.map(c => c.label),
                datasets: [
                  {
                    label: 'Goal',
                    data: campaignProgressData.map(c => c.goal),
                    backgroundColor: '#1a1a2e80'
                  },
                  {
                    label: 'Raised',
                    data: campaignProgressData.map(c => c.raised),
                    backgroundColor: '#1a1a2e'
                  }
                ]
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true,
                    grid: { color: '#f0f0f0' }
                  },
                  x: {
                    grid: { display: false }
                  }
                }
              }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FundraiserDashboard;
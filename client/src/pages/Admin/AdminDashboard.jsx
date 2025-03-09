import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import axios from "axios";
import { getCampaigns } from "../../api/campaign";
import { getAllUsers } from "../../api/admin";
import { useNavigate } from "react-router-dom";
// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    totalUsers: 0,
    totalCampaigns: 0,
    totalFunds: 0,
    monthlyData: []
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch users data
        const usersResponse = await getAllUsers();
        const totalUsers = usersResponse.length;
  
        // Fetch campaigns data
        const campaignsResponse = await getCampaigns();
        const totalCampaigns = campaignsResponse.length;
  
        // Fetch payments data
        const paymentsResponse = await axios.get("http://localhost:3000/api/payments");
        console.log("Payments API Response:", paymentsResponse.data); // Debugging
  
        // Ensure data is an array
        const paymentData = Array.isArray(paymentsResponse.data.data) ? paymentsResponse.data.data : [];


  
        // Calculate total funds
        const totalFunds = paymentData.reduce((sum, payment) => sum + (payment.amount || 0), 0);
const monthlyStats = processMonthlyData(campaignsResponse, paymentData);

        console.log("Payments API Response:", paymentsResponse.data);
  
        setDashboardData({
          totalUsers,
          totalCampaigns,
          totalFunds,
          monthlyData: monthlyStats
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };
  
    fetchData();
  }, []);
 


  const processMonthlyData = (campaigns, payments) => {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    // Process campaign dates
    const campaignMonths = campaigns.reduce((acc, campaign) => {
      const month = new Date(campaign.createdAt).getMonth();
      acc[month] = (acc[month] || 0) + 1;
      return acc;
    }, {});

    // Process payment amounts
    const paymentMonths = payments.reduce((acc, payment) => {
      if (payment.campaignId) { // Ignore payments without campaignId
        const month = new Date(payment.date).getMonth();
        acc[month] = (acc[month] || 0) + payment.amount;
      }
      return acc;
    }, {});
    
    // Combine data
    return monthNames.map((month, index) => ({
      month,
      campaigns: campaignMonths[index] || 0,
      amount: paymentMonths[index] || 0
    }));
  };

  // Chart data configuration
  const chartData = {
    labels: dashboardData.monthlyData.map(item => item.month),
    datasets: [
      {
        label: "Funds Raised",
        data: dashboardData.monthlyData.map(item => item.amount),
        backgroundColor: "rgba(99, 102, 241, 0.8)",
        borderColor: "rgba(99, 102, 241, 1)",
        borderWidth: 2,
        borderRadius: 8,
        hoverBackgroundColor: "rgba(79, 70, 229, 0.8)",
      },
      {
        label: "New Campaigns",
        data: dashboardData.monthlyData.map(item => item.campaigns),
        backgroundColor: "rgba(236, 72, 153, 0.8)",
        borderColor: "rgba(236, 72, 153, 1)",
        borderWidth: 2,
        borderRadius: 8,
        hoverBackgroundColor: "rgba(219, 39, 119, 0.8)",
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#e2e8f0",
          font: {
            size: 14
          }
        }
      },
      title: {
        display: true,
        text: "Monthly Statistics",
        color: "#e2e8f0",
        font: {
          size: 20
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: "#e2e8f0",
          font: {
            size: 12
          }
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)"
        }
      },
      y: {
        ticks: {
          color: "#e2e8f0",
          font: {
            size: 12
          }
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)"
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] to-[#16213e] text-white p-8 pt-20 ">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 text-4xl font-bold">Admin Dashboard</h1>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-6 mb-12 md:grid-cols-3">
          <div className="p-6 transition-all border bg-white/5 rounded-xl backdrop-blur-sm border-white/10 hover:border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="mb-2 text-xl font-semibold text-gray-300">Total Users</h2>
                <p className="text-3xl font-bold">{dashboardData.totalUsers}</p>
              </div>
              <div className="p-4 rounded-lg bg-indigo-500/20">
                <svg className="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="p-6 transition-all border bg-white/5 rounded-xl backdrop-blur-sm border-white/10 hover:border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="mb-2 text-xl font-semibold text-gray-300">Total Campaigns</h2>
                <p className="text-3xl font-bold">{dashboardData.totalCampaigns}</p>
              </div>
              <div className="p-4 rounded-lg bg-pink-500/20">
                <svg className="w-8 h-8 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
            </div>
          </div>

          <div className="p-6 transition-all border bg-white/5 rounded-xl backdrop-blur-sm border-white/10 hover:border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="mb-2 text-xl font-semibold text-gray-300">Total Funds</h2>
                <p className="text-3xl font-bold">${dashboardData.totalFunds ? dashboardData.totalFunds.toLocaleString() : 0}</p>

              </div>
              <div className="p-4 rounded-lg bg-green-500/20">
                <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Chart Section */}
        <div className="p-6 transition-all border bg-white/5 rounded-xl backdrop-blur-sm border-white/10 hover:border-white/20">
          <Bar data={chartData} options={chartOptions} />
        </div>

        {/* Additional Stats Section */}
        <div className="grid grid-cols-1 gap-6 mt-12 md:grid-cols-2">
          <div className="p-6 transition-all border bg-white/5 rounded-xl backdrop-blur-sm border-white/10 hover:border-white/20">
            <h3 className="mb-4 text-xl font-semibold">Recent Activity</h3>
            <div className="space-y-4">
              {/* Add recent activity items here */}
            </div>
          </div>
          
          <div className="p-6 transition-all border bg-white/5 rounded-xl backdrop-blur-sm border-white/10 hover:border-white/20">
            <h3 className="mb-4 text-xl font-semibold">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-4">
              <button className="p-4 transition-all rounded-lg bg-indigo-500/20 hover:bg-indigo-500/30" onClick={()=>navigate("/admin/manage-users")}>
                <span className="text-indigo-400">Manage Users</span>
              </button>
              <button className="p-4 transition-all rounded-lg bg-pink-500/20 hover:bg-pink-500/30" onClick={()=>navigate("/admin/manage-campaigns")}>
                <span className="text-pink-400">View Campaigns</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
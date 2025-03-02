import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const FundraiserDashboard = () => {
  return (
    <>
      <Navbar userRole="fundraiser" />

      <div className="min-h-screen bg-gradient-to-r from-[#1a1a2e] to-[#16213e] text-white p-8">
        <h1 className="text-3xl font-bold mb-8">Fundraiser Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/10 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Total Campaigns</h2>
            <p className="text-gray-300">5</p>
          </div>
          <div className="bg-white/10 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Total Funds Raised</h2>
            <p className="text-gray-300">$10,000</p>
          </div>
          <div className="bg-white/10 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Active Campaigns</h2>
            <p className="text-gray-300">3</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FundraiserDashboard;

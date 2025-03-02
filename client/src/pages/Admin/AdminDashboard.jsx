import React from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

const AdminDashboard = () => {
  return (
    <>
      <Navbar userRole="admin" />
      <div className="min-h-screen bg-gradient-to-r from-[#1a1a2e] to-[#16213e] text-white p-8">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/10 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Total Users</h2>
            <p className="text-gray-300">100</p>
          </div>
          <div className="bg-white/10 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Total Campaigns</h2>
            <p className="text-gray-300">50</p>
          </div>
          <div className="bg-white/10 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Total Funds Raised</h2>
            <p className="text-gray-300">$500,000</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AdminDashboard;

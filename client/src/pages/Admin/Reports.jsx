import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const Reports = () => {
  return (
    <>
      <Navbar userRole="admin" />

      <div className="min-h-screen bg-gradient-to-r from-[#1a1a2e] to-[#16213e] text-white p-8">
        <h1 className="text-3xl font-bold mb-8">Reports</h1>
        <div className="bg-white/10 p-6 rounded-lg shadow-lg">
          <p className="text-gray-300">No reports available.</p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Reports;

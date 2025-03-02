import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const FundraiserProfile = () => {
  return (
    <>
      <Navbar userRole="fundraiser" />

      <div className="min-h-screen bg-gradient-to-r from-[#1a1a2e] to-[#16213e] text-white p-8">
        <h1 className="text-3xl font-bold mb-8">Your Profile</h1>
        <div className="bg-white/10 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4">Personal Information</h2>
          <p className="text-gray-300 mb-4">Name: Jane Doe</p>
          <p className="text-gray-300 mb-4">Email: jane.doe@example.com</p>
          <p className="text-gray-300 mb-4">Total Funds Raised: $10,000</p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FundraiserProfile;

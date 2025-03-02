import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const BackerProfile = () => {
  return (
    <>
      <Navbar userRole="backer" />

      <div className="min-h-screen bg-white p-8 mt-20">
        <h1 className="text-3xl font-bold mb-8 text-[#1a1a2e]">Your Profile</h1>
        <div className="bg-white/10 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4">Personal Information</h2>
          <p className="text-gray-300 mb-4">Name: John Doe</p>
          <p className="text-gray-300 mb-4">Email: john.doe@example.com</p>
          <p className="text-gray-300 mb-4">Total Donations: $500</p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BackerProfile;

import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const Messages = () => {
  return (
    <>
      <Navbar userRole="fundraiser" />

      <div className="min-h-screen bg-gradient-to-r from-[#1a1a2e] to-[#16213e] text-white p-8">
        <h1 className="text-3xl font-bold mb-8">Messages</h1>
        <div className="bg-white/10 p-6 rounded-lg shadow-lg">
          <p className="text-gray-300">No new messages.</p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Messages;

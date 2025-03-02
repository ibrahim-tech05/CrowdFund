import React from "react";
import CampaignCard from "../../components/CampaignCard";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const ManageCampaigns = () => {
  const [campaigns, setCampaigns] = React.useState([
    {
      id: 1,
      title: "Education for All",
      image: "https://via.placeholder.com/400x200",
      progress: 60,
      goal: 5000,
      type: "Education",
    },
    // Add more campaigns dynamically
  ]);

  return (
    <>
      <Navbar userRole="admin" />

      <div className="min-h-screen bg-gradient-to-r from-[#1a1a2e] to-[#16213e] text-white p-8">
        <h1 className="text-3xl font-bold mb-8">Manage Campaigns</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {campaigns.map((campaign) => (
            <CampaignCard key={campaign.id} {...campaign} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ManageCampaigns;

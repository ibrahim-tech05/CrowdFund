import React from "react";
import CampaignCard from "../../components/CampaignCard";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const BackerSaved = () => {
  const [savedCampaigns, setSavedCampaigns] = React.useState([
    {
      id: 1,
      title: "Education for All",
      image: "https://via.placeholder.com/400x200",
      progress: 60,
      goal: 5000,
      type: "Education",
      isBookmarked: true,
    },
    // Add more saved campaigns dynamically
  ]);

  return (
    <>
      <Navbar userRole="backer" />

      <div className="min-h-screen bg-white  p-8 mt-20">
        <h1 className="text-4xl font-bold mb-8 text-center text-[#1a1a2e]">
          Saved Campaigns
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {savedCampaigns.map((campaign) => (
            <CampaignCard
              key={campaign.id}
              {...campaign}
              onBookmark={() =>
                setSavedCampaigns((prev) =>
                  prev.filter((c) => c.id !== campaign.id)
                )
              }
            />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BackerSaved;

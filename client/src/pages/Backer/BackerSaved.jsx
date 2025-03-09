import React, { useState, useEffect } from "react";
import CampaignCard from "../../components/CampaignCard";
import { getSavedCampaignsByEmail } from "../../api/campaign";

const BackerSaved = () => {
  const [savedCampaigns, setSavedCampaigns] = useState([]);

  const email = localStorage.getItem("email");

  useEffect(() => {
    const fetchSavedCampaigns = async () => {
      try {
        const data = await getSavedCampaignsByEmail(email);
        setSavedCampaigns(data);
      } catch (error) {
        console.error("Error fetching saved campaigns:", error);
      }
    };
    fetchSavedCampaigns();
  }, [email]);

  return (
    <div className="min-h-screen p-8 mt-20 bg-white">
      <h1 className="text-4xl font-bold mb-8 text-center text-[#1a1a2e]">Saved Campaigns</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {savedCampaigns.map(campaign => (
          <CampaignCard
            key={campaign._id}
            {...campaign}
            loggedInEmail={email}
            onShowLoginAlert={() => setShowLoginAlert(true)}
          />
        ))}
      </div>

    </div>
  );
};

export default BackerSaved;
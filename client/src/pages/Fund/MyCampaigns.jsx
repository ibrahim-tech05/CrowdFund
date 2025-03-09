import React, { useState, useEffect } from "react";
import CampaignCard from "../../components/CampaignCard";
import { getCampaignsByEmail, deleteCampaign } from "../../api/campaign";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify styles

const MyCampaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const email = localStorage.getItem("email"); // Get logged-in user's email

  useEffect(() => {
    if (email) {
      getCampaignsByEmail(email)
        .then((data) => setCampaigns(data))
        .catch((error) => console.error("Error fetching campaigns:", error));
    }
  }, [email]); // Refetch if email changes

  // Handle Delete Campaign
  const handleDelete = async (id) => {
    try {
      await deleteCampaign(id, email);
      setCampaigns((prev) => prev.filter((campaign) => campaign._id !== id)); // Remove from UI
      toast.success("Campaign deleted successfully!", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    } catch (error) {
      console.error("Error deleting campaign:", error);
      toast.error("Failed to delete campaign!", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#f6f6f6] text-[#1a1a2e] p-8">
      <h1 className="mb-8 text-3xl font-bold text-center">My Campaigns</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {campaigns.length > 0 ? (
          campaigns.map((campaign) => (
            <CampaignCard
              key={campaign._id}
              id={campaign._id}
              title={campaign.title}
              image={campaign.image}
              progress={campaign.progress}
              goal={campaign.goal}
              type={campaign.type}
              isBookmarked={campaign.isBookmarked}
              creatorEmail={campaign.email}
              loggedInEmail={email}
              onDelete={handleDelete} // Pass delete function
              status={campaign.status}
            />
          ))
        ) : (
          <p className="text-center">No campaigns found</p>
        )}
      </div>
    </div>
  );
};

export default MyCampaigns;
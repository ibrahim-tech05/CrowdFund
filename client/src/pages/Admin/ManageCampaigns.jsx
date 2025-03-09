import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import CampaignCard from "../../components/CampaignCard";
import { deleteCampaign, getCampaigns } from "../../api/campaign";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManageCampaigns = () => {
  const [campaigns, setCampaigns] = React.useState([]);
  const loggedInEmail = localStorage.getItem("email"); // Get logged in user's email

  React.useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      const data = await getCampaigns();
      setCampaigns(data);
    } catch (error) {
      toast.error("Failed to load campaigns", {
        position: "bottom-right",
        autoClose: 3000,
      });
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteCampaign(id);
      setCampaigns(campaigns.filter(campaign => campaign.id !== id));
      toast.success("Campaign deleted successfully!", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      toast.error("Failed to delete campaign", {
        position: "bottom-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#f6f6f6] text-[#1a1a2e] p-8 ">
      <div className="mx-auto max-w-7xl">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-4xl font-bold text-center"
        >
          Manage Campaigns
        </motion.h1>

        <AnimatePresence>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {campaigns.map((campaign) => (
              <motion.div
                key={campaign.id}
                layout
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.3 }}
              >
                <CampaignCard
                  {...campaign}
                  onDelete={handleDelete}
                  loggedInEmail={loggedInEmail}
                  creatorEmail={campaign.creatorEmail} // Ensure your API returns creatorEmail
                />
              </motion.div>
            ))}
          </div>
        </AnimatePresence>

        {campaigns.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-16 text-xl text-center text-gray-400"
          >
            No campaigns found. Create your first campaign!
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ManageCampaigns;
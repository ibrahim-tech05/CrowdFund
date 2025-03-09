import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaBookmark, FaTrash } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_BASE_URL = "http://localhost:3000/api/campaigns";

const CampaignCard = ({
  id,
  title,
  image,
  progress,
  goal,
  type,
  isBookmarked,
  onBookmark,
  onDelete,
  creatorEmail,
  loggedInEmail,
  status,
}) => {
  const [role, setRole] = useState("");
  const [isBookmarkLoading, setIsBookmarkLoading] = useState(false);
  const [campaignStatus, setCampaignStatus] = useState(status);

  const navigate = useNavigate();

  useEffect(() => {
    const userRole = localStorage.getItem("role");
    if (userRole) setRole(userRole);
  }, []);

  useEffect(() => {
    setCampaignStatus(status);
  }, [status]);

  const handleBookmark = async () => {
    if (isBookmarkLoading) return;
    setIsBookmarkLoading(true);
    try {
      await onBookmark(id);
    } finally {
      setIsBookmarkLoading(false);
    }
  };

  const handleDonateClick = () => {
    if (!loggedInEmail) {
      toast.error("Please login to donate.", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    if (role !== "backer") {
      toast.error("Only backers can donate.", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    if (role === "backer" && campaignStatus === "active") {
      navigate(`/donate/${id}`);
    }
  };

  const toggleStatus = async () => {
    try {
      const newStatus = campaignStatus === "active" ? "inactive" : "active";
      await axios.put(`${API_BASE_URL}/${id}/status`, { status: newStatus });
      setCampaignStatus(newStatus);
    } catch (error) {
      alert("Failed to update status");
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="relative w-full max-w-sm overflow-hidden bg-white rounded-lg shadow-lg"
    >
      
      <div className="relative h-52">
        <img src={image} alt={title} className="object-cover w-full h-full" />
        {role === "backer" && (
          <button
            className="absolute p-2 bg-white rounded-full shadow-sm top-2 right-2 hover:shadow-md"
            onClick={handleBookmark}
            disabled={isBookmarkLoading}
          >
            <FaBookmark className={isBookmarked ? "text-[#1a1a2e]" : "text-gray-400"} />
          </button>
        )}
      </div>

      <div className="p-6">
        <h3 className="mb-2 text-xl font-bold">{title}</h3>
        <p className="mb-4 text-gray-600">{type}</p>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div className="bg-[#1a1a2e] h-2.5 rounded-full" style={{ width: `${progress}%` }} />
        </div>
        <p className="mt-2 text-gray-600">${goal.toLocaleString()} goal</p>

        {role === "backer" && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDonateClick}
            disabled={campaignStatus !== "active"}
            className={`mt-4 w-[50%] px-6 py-2 rounded-full ${
              campaignStatus === "active" ? "bg-[#1a1a2e] text-white" : "bg-gray-300 text-gray-500"
            }`}
          >
            {campaignStatus === "active" ? "Donate Now" : "Campaign Ended"}
          </motion.button>
        )}

        {(role === "admin" || role === "fundraiser") && (
          <button
            onClick={toggleStatus}
            className={`mt-4 w-[50%] px-6 py-2 rounded-full ${
              campaignStatus === "active" ? "bg-red-500 text-white" : "bg-green-600 text-white"
            }`}
          >
            {campaignStatus === "active" ? "Deactivate" : "Activate"}
          </button>
        )}

{(role === "admin" || creatorEmail === loggedInEmail) && onDelete && (
  <button
    onClick={() => onDelete(id)}
    className="absolute p-2 text-white bg-red-500 rounded-full bottom-7 right-4"
  >
    <FaTrash />
  </button>
)}
      </div>
    </motion.div>
  );
};

export default CampaignCard;
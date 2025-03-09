import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import CampaignCard from "../../components/CampaignCard";
import SearchBar from "../../components/SearchBar";
import CircleLoader from "../../components/CircleLoader";
import { getCampaigns, toggleBookmark } from "../../api/campaign";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import ReactDOM from "react-dom";

const ExploreChampions = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showLoginAlert, setShowLoginAlert] = useState(false);
  const email = localStorage.getItem("email");

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const data = await getCampaigns();
        setCampaigns(data);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCampaigns();
  }, []);

  const handleBookmark = async (campaignId) => {
    try {
      await toggleBookmark(campaignId, email);
      setCampaigns(prev => prev.map(camp => 
        camp._id === campaignId ? {
          ...camp,
          isBookmarked: camp.isBookmarked.includes(email) ? 
            camp.isBookmarked.filter(e => e !== email) : 
            [...camp.isBookmarked, email]
        } : camp
      ));
    } catch (error) {
      console.error("Bookmark error:", error);
    }
  };

  const filteredCampaigns = campaigns.filter(campaign =>
    campaign.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container px-4 py-8 mx-auto ">
      <h1 className="mb-8 text-3xl font-bold text-center">Explore Champions</h1>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {isLoading ? (
        <CircleLoader />
      ) : (
        <Section
          title="Featured Campaigns"
          index={currentIndex}
          total={filteredCampaigns.length}
          onNext={() => setCurrentIndex(prev => Math.min(prev + 3, filteredCampaigns.length - 1))}
          onPrev={() => setCurrentIndex(prev => Math.max(prev - 3, 0))}
        >
          {filteredCampaigns.slice(currentIndex, currentIndex + 3).map(campaign => (
            <CampaignCard
              key={campaign._id}
              {...campaign}
              loggedInEmail={email}
              isBookmarked={campaign.isBookmarked.includes(email)} // Pass correct isBookmarked value
              onShowLoginAlert={() => setShowLoginAlert(true)}
              onBookmark={handleBookmark}
            />
          ))}
        </Section>
      )}

      {showLoginAlert && ReactDOM.createPortal(
        <div className="modal-overlay fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-6 text-center bg-white rounded-lg">
            <h3 className="mb-4 text-xl font-bold">Login Required</h3>
            <button
              onClick={() => {
                setShowLoginAlert(false);
                window.location.href = "/login";
              }}
              className="bg-[#1a1a2e] text-white px-6 py-2 rounded-lg hover:bg-[#16213e]"
            >
              Go to Login
            </button>
          </div>
        </div>,
        document.getElementById("modal-root")
      )}
    </div>
  );
};

const Section = ({ title, index, total, onNext, onPrev, children }) => (
  <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
    <h2 className="mb-8 text-3xl font-bold text-center">{title}</h2>
    <div className="relative flex items-center">
      {index > 0 && <ArrowButton direction="left" onClick={onPrev} />}
      <motion.div className="grid w-full grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {children}
      </motion.div>
      {total > 3 && index + 3 < total && <ArrowButton direction="right" onClick={onNext} />}
    </div>
  </div>
);

const ArrowButton = ({ direction, onClick }) => (
  <button
    onClick={onClick}
    className={`absolute ${direction === "left" ? "left-[-50px]" : "right-[-50px]"} top-1/2 transform -translate-y-1/2 bg-[#1a1a2e] text-white p-3 rounded-full hover:bg-[#16213e]`}
    style={{ zIndex: 10 }}
  >
    {direction === "left" ? <FaArrowLeft /> : <FaArrowRight />}
  </button>
);

export default ExploreChampions;
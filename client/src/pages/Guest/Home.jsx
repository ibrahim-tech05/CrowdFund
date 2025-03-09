import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import CampaignCard from "../../components/CampaignCard";
import StoryCard from "../../components/StoryCard";
import SearchBar from "../../components/SearchBar";
import CircleLoader from "../../components/CircleLoader";
import Navbar from "../../components/Navbar";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { getCampaigns } from "../../api/campaign";
import {getSuccessStories} from "../../api/successStory"
import axios from "axios";
import ReactDOM from "react-dom";
import Home1 from "../../assets/Home2.jpg";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [campaigns, setCampaigns] = useState([]);
  const [successStories, setSuccessStories] = useState([]);
  const [campaignIndex, setCampaignIndex] = useState(0);
  const [storyIndex, setStoryIndex] = useState(0);
  const [trendingIndex, setTrendingIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [showLoginAlert, setShowLoginAlert] = useState(false);
  const email = localStorage.getItem("email");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const campaignsData = await getCampaigns();
        const storiesResponse = await axios.get("http://localhost:3000/api/success-stories");
        setCampaigns(campaignsData);
        setSuccessStories(storiesResponse.data);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredCampaigns = campaigns.filter(campaign =>
    campaign.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="relative h-[740px] flex items-center justify-center bg-cover bg-center overflow-hidden">
        <div className="absolute inset-0 bg-center bg-cover" style={{ backgroundImage: `url(${Home1})`, filter: "blur(3px)" }}></div>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 text-center text-white">
          <h1 className="mb-4 text-5xl font-bold">Welcome to CrowdFund</h1>
          <motion.button whileHover={{ scale: 1.1 }} className="bg-[#1a1a2e] text-white px-8 py-3 rounded-full hover:bg-[#16213e]">
            Donate Now
          </motion.button>
        </div>
      </div>

      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <Section
        title="Ongoing Campaigns"
        index={campaignIndex}
        total={filteredCampaigns.length}
        onNext={() => setCampaignIndex(prev => prev + 3 < filteredCampaigns.length ? prev + 3 : prev)}
        onPrev={() => setCampaignIndex(prev => prev >= 3 ? prev - 3 : prev)}
      >
        {filteredCampaigns.slice(campaignIndex, campaignIndex + 3).map(campaign => (
          <CampaignCard
            key={campaign._id}
            {...campaign}
            loggedInEmail={email}
            onShowLoginAlert={() => setShowLoginAlert(true)}
          />
        ))}
      </Section>

      <Section
        title="Success Stories"
        index={storyIndex}
        total={successStories.length}
        onNext={() => setStoryIndex(prev => prev + 3 < successStories.length ? prev + 3 : prev)}
        onPrev={() => setStoryIndex(prev => prev >= 3 ? prev - 3 : prev)}
      >
        {successStories.slice(storyIndex, storyIndex + 3).map(story => (
          <StoryCard key={story._id} {...story} />
        ))}
      </Section>

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

export default Home;
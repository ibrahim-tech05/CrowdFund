import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import CampaignCard from "../../components/CampaignCard";
import StoryCard from "../../components/StoryCard";
import SearchBar from "../../components/SearchBar";
import CircleLoader from "../../components/CircleLoader";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { getCampaigns, toggleBookmark } from "../../api/campaign";
import { getSuccessStories } from "../../api/successStory";

const BackerHome = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [campaigns, setCampaigns] = useState([]);
  const [successStories, setSuccessStories] = useState([]);
  const [campaignIndex, setCampaignIndex] = useState(0);
  const [trendingIndex, setTrendingIndex] = useState(0);
  const [storyIndex, setStoryIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [showLoginAlert, setShowLoginAlert] = useState(false);
  const email = localStorage.getItem("email");
  const name = localStorage.getItem("name");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const campaignsData = await getCampaigns();
        const storiesData = await getSuccessStories();
        setCampaigns(campaignsData);
        setSuccessStories(storiesData);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
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
      console.error("Error toggling bookmark:", error);
    }
  };

  const filteredCampaigns = campaigns.filter(campaign =>
    campaign.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const trendingCampaigns = [...campaigns]
    .sort((a, b) => (b.progress / b.goal) - (a.progress / a.goal))
    .slice(0, 5);

  return (
    <div className="min-h-screen bg-[#f6f6f6] text-[#1a1a2e] p-8 ">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-5xl font-bold">Welcome, {name || "Backer"}!</h1>
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
              isBookmarked={campaign.isBookmarked.includes(email)} // Pass correct isBookmarked value
              onShowLoginAlert={() => setShowLoginAlert(true)}
              onBookmark={handleBookmark}
            />
          ))}
        </Section>

        <Section
          title="Trending Campaigns"
          index={trendingIndex}
          total={trendingCampaigns.length}
          onNext={() => setTrendingIndex(prev => prev + 3 < trendingCampaigns.length ? prev + 3 : prev)}
          onPrev={() => setTrendingIndex(prev => prev >= 3 ? prev - 3 : prev)}
        >
          {trendingCampaigns.slice(trendingIndex, trendingIndex + 3).map(campaign => (
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
      </div>
    </div>
  );
};

const Section = ({ title, index, total, onNext, onPrev, children }) => (
  <div className="px-4 py-12">
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

export default BackerHome;
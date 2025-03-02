import { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import SearchBar from "../../components/SearchBar";
import CampaignCard from "../../components/CampaignCard";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";
import Ed1 from "../../assets/Ed1.jpeg";
import Fd1 from "../../assets/fund1.jpg";
import Hd1 from "../../assets/Health1.jpeg";

const BackerHome = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [bookmarkedCampaigns, setBookmarkedCampaigns] = useState([]);
  const [campaignIndex, setCampaignIndex] = useState(0);

  const toggleBookmark = (title) => {
    if (bookmarkedCampaigns.includes(title)) {
      setBookmarkedCampaigns(
        bookmarkedCampaigns.filter((item) => item !== title)
      );
    } else {
      setBookmarkedCampaigns([...bookmarkedCampaigns, title]);
    }
  };

  const campaigns = [
    {
      title: "Education for All",
      image: Ed1,
      progress: 60,
      goal: 10000,
      type: "education",
    },
    {
      title: "Startup Funding",
      image: Fd1,
      progress: 30,
      goal: 50000,
      type: "funding",
    },
    {
      title: "Health Awareness",
      image: Hd1,
      progress: 80,
      goal: 20000,
      type: "health",
    },
    {
      title: "Animal Rescue",
      image: Hd1,
      progress: 45,
      goal: 15000,
      type: "animals",
    },
    {
      title: "Art Project",
      image: Ed1,
      progress: 70,
      goal: 25000,
      type: "art",
    },
  ];
  const filteredCampaigns = campaigns.filter((campaign) =>
    campaign.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const visibleCampaigns = filteredCampaigns.slice(
    campaignIndex,
    campaignIndex + 3
  );
  const handleCampaignNext = () => {
    if (campaignIndex + 3 < filteredCampaigns.length) {
      setCampaignIndex(campaignIndex + 3);
    }
  };

  const handleCampaignPrev = () => {
    if (campaignIndex - 3 >= 0) {
      setCampaignIndex(campaignIndex - 3);
    }
  };

  return (
    <>
      <Navbar userRole="backer" />

      <div className="min-h-screen bg-white text-[#1a1a2e] p-8 mt-20">
        <h1 className="text-3xl font-bold mb-8">Welcome Back, Backer!</h1>
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        {/* Campaigns Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-3xl font-bold text-center mb-8">
            Ongoing Campaigns
          </h2>

          <div className="relative flex items-center">
            {/* Left Arrow */}
            {campaignIndex > 0 && (
              <button
                onClick={handleCampaignPrev}
                className="absolute left-[-50px] top-1/2 transform -translate-y-1/2 bg-[#1a1a2e] text-white p-3 rounded-full hover:bg-[#16213e] transition duration-300"
                style={{ zIndex: 10 }}
              >
                <FaArrowLeft />
              </button>
            )}

            {/* Campaign Cards */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full"
            >
              {visibleCampaigns.map((campaign, index) => (
                <CampaignCard
                  key={index}
                  {...campaign}
                  isBookmarked={bookmarkedCampaigns.includes(campaign.title)}
                  onBookmark={() => toggleBookmark(campaign.title)}
                />
              ))}
            </motion.div>

            {/* Right Arrow */}
            {filteredCampaigns.length > 3 &&
              campaignIndex + 3 < filteredCampaigns.length && (
                <button
                  onClick={handleCampaignNext}
                  className="absolute right-[-50px] top-1/2 transform -translate-y-1/2 bg-[#1a1a2e] text-white p-3 rounded-full hover:bg-[#16213e] transition duration-300"
                  style={{ zIndex: 10 }}
                >
                  <FaArrowRight />
                </button>
              )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BackerHome;

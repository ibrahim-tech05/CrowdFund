import { useState } from "react";
import Navbar from "../../components/Navbar";
import CampaignCard from "../../components/CampaignCard";
import StoryCard from "../../components/StoryCard";
import Footer from "../../components/Footer";
import SearchBar from "../../components/SearchBar";
import {
  FaFire,
  FaHeart,
  FaStar,
  FaHandHoldingUsd,
  FaSmile,
  FaBookmark,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";
import { motion } from "framer-motion";
import Home1 from "../../assets/Home2.jpg";
import Ed1 from "../../assets/Ed1.jpeg";
import Fd1 from "../../assets/fund1.jpg";
import Hd1 from "../../assets/Health1.jpeg";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [bookmarkedCampaigns, setBookmarkedCampaigns] = useState([]);
  const [campaignIndex, setCampaignIndex] = useState(0);
  const [storyIndex, setStoryIndex] = useState(0);
  const [trendingIndex, setTrendingIndex] = useState(0);

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

  const trendingFundraisers = [
    {
      title: "Save the Children",
      image: Ed1,
      progress: 90,
      goal: 50000,
      type: "charity",
      icon: <FaHeart className="text-red-500" />,
    },
    {
      title: "Tech Innovation",
      image: Fd1,
      progress: 50,
      goal: 100000,
      type: "technology",
      icon: <FaFire className="text-orange-500" />,
    },
    {
      title: "Community Health",
      image: Hd1,
      progress: 70,
      goal: 30000,
      type: "health",
      icon: <FaStar className="text-yellow-500" />,
    },
    {
      title: "Environmental Cleanup",
      image: Ed1,
      progress: 65,
      goal: 40000,
      type: "environment",
      icon: <FaSmile className="text-green-500" />,
    },
    {
      title: "Community Development",
      image: Fd1,
      progress: 85,
      goal: 60000,
      type: "community",
      icon: <FaHandHoldingUsd className="text-blue-500" />,
    },
  ];

  const successStories = [
    {
      title: "Education Success",
      image: Ed1,
      description: "Helped 1000 children get access to education.",
      icon: <FaSmile className="text-green-500" />,
    },
    {
      title: "Startup Growth",
      image: Fd1,
      description: "Funded a startup that created 50 jobs.",
      icon: <FaHandHoldingUsd className="text-blue-500" />,
    },
    {
      title: "Health Improvement",
      image: Hd1,
      description: "Provided health services to 5000 people.",
      icon: <FaHeart className="text-red-500" />,
    },
    {
      title: "Environmental Cleanup",
      image: Ed1,
      description: "Cleaned up 10 tons of waste from local rivers.",
      icon: <FaSmile className="text-green-500" />,
    },
    {
      title: "Community Development",
      image: Fd1,
      description: "Built a community center for 500 families.",
      icon: <FaHandHoldingUsd className="text-blue-500" />,
    },
  ];

  const filteredCampaigns = campaigns.filter((campaign) =>
    campaign.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const visibleCampaigns = filteredCampaigns.slice(
    campaignIndex,
    campaignIndex + 3
  );
  const visibleStories = successStories.slice(storyIndex, storyIndex + 3);
  const visibleTrending = trendingFundraisers.slice(
    trendingIndex,
    trendingIndex + 3
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

  const handleStoryNext = () => {
    if (storyIndex + 3 < successStories.length) {
      setStoryIndex(storyIndex + 3);
    }
  };

  const handleStoryPrev = () => {
    if (storyIndex - 3 >= 0) {
      setStoryIndex(storyIndex - 3);
    }
  };

  const handleTrendingNext = () => {
    if (trendingIndex + 3 < trendingFundraisers.length) {
      setTrendingIndex(trendingIndex + 3);
    }
  };

  const handleTrendingPrev = () => {
    if (trendingIndex - 3 >= 0) {
      setTrendingIndex(trendingIndex - 3);
    }
  };

  return (
    <div>
      <Navbar userRole="admin" />

      {/* Hero Section */}
      <div className="relative h-[740px] flex items-center justify-center bg-cover bg-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center object-contain"
          style={{ backgroundImage: `url(${Home1})`, filter: "blur(3px)" }}
        ></div>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative text-center text-white z-10">
          <h1 className="text-5xl font-bold mb-4">Welcome to CrowdFund</h1>
          <p className="text-xl mb-8">
            Empowering dreams through collective support. Donate today and make
            a difference!
          </p>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-[#1a1a2e] text-white px-8 py-3 rounded-full hover:bg-[#16213e] transition duration-300"
          >
            Donate Now
          </motion.button>
        </div>
      </div>

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

      {/* Trending Fundraisers Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold text-center mb-8">
          Trending Fundraisers
        </h2>

        <div className="relative flex items-center">
          {/* Left Arrow */}
          {trendingIndex > 0 && (
            <button
              onClick={handleTrendingPrev}
              className="absolute left-[-50px] top-1/2 transform -translate-y-1/2 bg-[#1a1a2e] text-white p-3 rounded-full hover:bg-[#16213e] transition duration-300"
              style={{ zIndex: 10 }}
            >
              <FaArrowLeft />
            </button>
          )}

          {/* Trending Fundraiser Cards */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full"
          >
            {visibleTrending.map((fundraiser, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <div className="relative h-48">
                  <img
                    src={fundraiser.image}
                    alt={fundraiser.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    {fundraiser.icon}
                  </div>
                  <button
                    className="absolute top-2 right-2 bg-white p-2 rounded-full"
                    onClick={() => toggleBookmark(fundraiser.title)}
                  >
                    <FaBookmark
                      className={`${
                        bookmarkedCampaigns.includes(fundraiser.title)
                          ? "text-[#1a1a2e]"
                          : "text-gray-400"
                      }`}
                    />
                  </button>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{fundraiser.title}</h3>
                  <p className="text-gray-600 mb-4">{fundraiser.type}</p>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-[#1a1a2e] h-2.5 rounded-full"
                      style={{ width: `${fundraiser.progress}%` }}
                    ></div>
                  </div>
                  <p className="text-gray-600 mt-2">
                    ${fundraiser.goal.toLocaleString()} goal
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-4 bg-[#1a1a2e] text-white px-6 py-2 rounded-full hover:bg-[#16213e] transition duration-300"
                  >
                    Donate Now
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Right Arrow */}
          {trendingFundraisers.length > 3 &&
            trendingIndex + 3 < trendingFundraisers.length && (
              <button
                onClick={handleTrendingNext}
                className="absolute right-[-50px] top-1/2 transform -translate-y-1/2 bg-[#1a1a2e] text-white p-3 rounded-full hover:bg-[#16213e] transition duration-300"
                style={{ zIndex: 10 }}
              >
                <FaArrowRight />
              </button>
            )}
        </div>
      </div>

      {/* Success Stories Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold text-center mb-8">Success Stories</h2>
        <div className="relative flex items-center">
          {/* Left Arrow */}
          {storyIndex > 0 && (
            <button
              onClick={handleStoryPrev}
              className="absolute left-[-50px] top-1/2 transform -translate-y-1/2 bg-[#1a1a2e] text-white p-3 rounded-full hover:bg-[#16213e] transition duration-300"
              style={{ zIndex: 10 }}
            >
              <FaArrowLeft />
            </button>
          )}

          {/* Success Story Cards */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full"
          >
            {visibleStories.map((story, index) => (
              <StoryCard key={index} {...story} />
            ))}
          </motion.div>

          {/* Right Arrow */}
          {successStories.length > 3 &&
            storyIndex + 3 < successStories.length && (
              <button
                onClick={handleStoryNext}
                className="absolute right-[-50px] top-1/2 transform -translate-y-1/2 bg-[#1a1a2e] text-white p-3 rounded-full hover:bg-[#16213e] transition duration-300"
                style={{ zIndex: 10 }}
              >
                <FaArrowRight />
              </button>
            )}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;

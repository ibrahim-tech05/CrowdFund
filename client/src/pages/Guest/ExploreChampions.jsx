import React, { useState } from "react";
import { motion } from "framer-motion";
import CampaignCard from "../../components/CampaignCard";
import SearchBar from "../../components/SearchBar";
import Footer from "../../components/Footer";

const ExploreChampions = () => {
  // Sample campaign data (can be fetched from an API)
  const [campaigns, setCampaigns] = useState([
    {
      id: 1,
      title: "Education for All",
      image: "https://via.placeholder.com/400x200",
      progress: 60,
      goal: 5000,
      type: "Education",
      isBookmarked: false,
    },
    {
      id: 2,
      title: "Clean Water Initiative",
      image: "https://via.placeholder.com/400x200",
      progress: 30,
      goal: 10000,
      type: "Environment",
      isBookmarked: false,
    },
    {
      id: 3,
      title: "Tech for Good",
      image: "https://via.placeholder.com/400x200",
      progress: 80,
      goal: 8000,
      type: "Technology",
      isBookmarked: false,
    },
    {
      id: 4,
      title: "Women Empowerment",
      image: "https://via.placeholder.com/400x200",
      progress: 50,
      goal: 15000,
      type: "Social",
      isBookmarked: false,
    },
    {
      id: 5,
      title: "Animal Rescue",
      image: "https://via.placeholder.com/400x200",
      progress: 70,
      goal: 12000,
      type: "Environment",
      isBookmarked: false,
    },
    {
      id: 6,
      title: "Disaster Relief",
      image: "https://via.placeholder.com/400x200",
      progress: 40,
      goal: 20000,
      type: "Social",
      isBookmarked: false,
    },
    {
      id: 7,
      title: "Art for Change",
      image: "https://via.placeholder.com/400x200",
      progress: 90,
      goal: 5000,
      type: "Art",
      isBookmarked: false,
    },
    {
      id: 8,
      title: "Youth Sports Program",
      image: "https://via.placeholder.com/400x200",
      progress: 25,
      goal: 10000,
      type: "Sports",
      isBookmarked: false,
    },
    {
      id: 9,
      title: "Healthcare Access",
      image: "https://via.placeholder.com/400x200",
      progress: 65,
      goal: 25000,
      type: "Health",
      isBookmarked: false,
    },
    {
      id: 10,
      title: "Green Earth Project",
      image: "https://via.placeholder.com/400x200",
      progress: 85,
      goal: 15000,
      type: "Environment",
      isBookmarked: false,
    },
    {
      id: 11,
      title: "Food for the Hungry",
      image: "https://via.placeholder.com/400x200",
      progress: 55,
      goal: 10000,
      type: "Social",
      isBookmarked: false,
    },
    {
      id: 12,
      title: "Renewable Energy Initiative",
      image: "https://via.placeholder.com/400x200",
      progress: 75,
      goal: 30000,
      type: "Technology",
      isBookmarked: false,
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");

  // Filter campaigns based on search query
  const filteredCampaigns = campaigns.filter((campaign) =>
    campaign.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Function to handle bookmarking
  const handleBookmark = (id) => {
    setCampaigns((prevCampaigns) =>
      prevCampaigns.map((campaign) =>
        campaign.id === id
          ? { ...campaign, isBookmarked: !campaign.isBookmarked }
          : campaign
      )
    );
  };

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="mt-10"></div>
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <h1 className="text-3xl font-bold mb-8 text-center">
          Explore Champions
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
          {filteredCampaigns.map((campaign) => (
            <CampaignCard
              key={campaign.id}
              title={campaign.title}
              image={campaign.image}
              progress={campaign.progress}
              goal={campaign.goal}
              type={campaign.type}
              isBookmarked={campaign.isBookmarked}
              onBookmark={() => handleBookmark(campaign.id)}
            />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ExploreChampions;

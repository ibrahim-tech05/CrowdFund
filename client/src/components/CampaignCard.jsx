import { motion } from "framer-motion";
import { FaBookmark } from "react-icons/fa";

const CampaignCard = ({
  title,
  image,
  progress,
  goal,
  type,
  isBookmarked,
  onBookmark,
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-sm"
    >
      <div className="relative h-48">
        <img src={image} alt={title} className="w-full h-full object-cover" />
        <button
          className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-sm hover:shadow-md transition-shadow"
          onClick={onBookmark}
        >
          <FaBookmark
            className={`${
              isBookmarked ? "text-[#1a1a2e]" : "text-gray-400"
            } transition-colors`}
          />
        </button>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{type}</p>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-[#1a1a2e] h-2.5 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-gray-600 mt-2">${goal.toLocaleString()} goal</p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-4 bg-[#1a1a2e] text-white px-6 py-2 rounded-full hover:bg-[#16213e] transition duration-300"
        >
          Donate Now
        </motion.button>
      </div>
    </motion.div>
  );
};

export default CampaignCard;

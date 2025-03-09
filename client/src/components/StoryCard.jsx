import React from "react";
import { motion } from "framer-motion";
import { FaTrash } from "react-icons/fa";

const StoryCard = ({ id, title, description, image, email, onDelete }) => {
  const loggedInEmail = localStorage.getItem("email"); // Get logged-in user's email

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.3 }}
      className="relative overflow-hidden transition-all duration-300 bg-white shadow-xl rounded-2xl hover:shadow-2xl"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="object-cover w-full h-full"
        />
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="mb-2 text-xl font-bold">{title}</h3>
        <p className="text-gray-700 line-clamp-3">{description}</p>

        {/* Delete button (visible only if the creator's email matches the logged-in email) */}
        {email === loggedInEmail && (
          <button
            onClick={onDelete}
            className="px-4 py-2 mt-4 text-red-600 hover:text-red-700"
          >
            <FaTrash/>
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default StoryCard;
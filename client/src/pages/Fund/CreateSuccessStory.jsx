import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { createSuccessStory, getSuccessStoriesByEmail, deleteSuccessStory } from "../../api/successStory";
import axios from "axios";
import imageCompression from "browser-image-compression";
import CircleLoader from "../../components/CircleLoader";
import StoryCard from "../../components/StoryCard";

const CreateSuccessStory = () => {
  const email = localStorage.getItem("email"); // Get email from local storage
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    email: email, // Include email in form data
  });

  const [stories, setStories] = useState([]); // Store user stories
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch user's success stories when component mounts
  useEffect(() => {
    fetchStories();
  }, []);

  // Fetch stories from API
  const fetchStories = async () => {
    try {
      const userStories = await getSuccessStoriesByEmail(email);
      setStories(userStories);
    } catch (error) {
      console.error("Failed to fetch stories:", error);
    }
  };

  // Handle deleting a story
  const handleDeleteStory = async (id) => {
    try {
      await deleteSuccessStory(id);
      setStories(stories.filter((story) => story._id !== id)); // Remove deleted story from UI
    } catch (error) {
      console.error("Failed to delete story:", error);
    }
  };

  // Handle image upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1024,
        useWebWorker: true,
      };
      const compressedFile = await imageCompression(file, options);

      const imageFormData = new FormData();
      imageFormData.append("image", compressedFile);

      const response = await axios.post(
        "http://localhost:3000/api/images/upload",
        imageFormData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.data?.imageUrl) {
        setFormData((prev) => ({ ...prev, image: response.data.imageUrl }));
        setErrors((prev) => ({ ...prev, image: "" }));
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      console.error("Image upload failed:", error);
      setErrors((prev) => ({ ...prev, image: "Image upload failed. Please try again." }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.description.trim() || !formData.image) {
      setErrors({ general: "All fields are required!" });
      return;
    }

    setIsLoading(true);
    setErrors({});
    setSuccess(false);

    try {
      await createSuccessStory(formData);
      setSuccess(true);
      setFormData({ title: "", description: "", image: "", email }); // Reset form
      fetchStories(); // Refresh stories
    } catch (error) {
      console.error("Failed to post story:", error);
      setErrors({ general: "Failed to post story. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-b from-[#f6f6f6] to-[#eaeaea] p-8 pt-24"
    >
      <motion.div
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        className="max-w-3xl mx-auto overflow-hidden bg-white shadow-xl rounded-2xl"
      >
        <div className="px-8 py-6 text-white bg-green-600">
          <h1 className="text-3xl font-bold">Share Your Success</h1>
          <p className="mt-2 text-gray-200">Inspire others with your achievement</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {errors.general && (
            <div className="p-4 text-red-600 bg-red-100 rounded-lg">
              {errors.general}
            </div>
          )}
          {success && (
            <div className="p-4 text-green-600 bg-green-100 rounded-lg">
              Success story published successfully!
            </div>
          )}
          <div className="space-y-4">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                name="title"
                value={formData.title}
                onChange={(e) => {
                  setFormData((prev) => ({ ...prev, title: e.target.value }));
                  setErrors((prev) => ({ ...prev, title: "" }));
                }}
                className={`w-full p-3 rounded-lg border-2 ${
                  errors.title ? "border-red-500" : "border-gray-200"
                } focus:border-[#1a1a2e] focus:ring-1 focus:ring-green-600 transition-all outline-none`}
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-500">{errors.title}</p>
              )}
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={(e) => {
                  setFormData((prev) => ({ ...prev, description: e.target.value }));
                  setErrors((prev) => ({ ...prev, description: "" }));
                }}
                className={`w-full p-3 rounded-lg border-2 ${
                  errors.description ? "border-red-500" : "border-gray-200"
                } focus:border-[#1a1a2e] focus:ring-1 focus:ring-green-600 transition-all outline-none`}
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-500">{errors.description}</p>
              )}
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Story Image
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="file"
                  onChange={handleImageUpload}
                  className="block w-full text-sm text-gray-500 transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-600 file:text-white hover:file:bg-green-700"
                  accept="image/*"
                />
                {formData.image && (
                  <motion.img
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    src={formData.image}
                    alt="Preview"
                    className="object-cover w-16 h-16 border-2 border-gray-200 rounded-lg"
                  />
                )}
              </div>
              {errors.image && (
                <p className="mt-1 text-sm text-red-500">{errors.image}</p>
              )}
            </div>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-6 py-3 font-semibold text-white transition-all rounded-lg bg-gradient-to-r from-green-600 to-green-700 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? <CircleLoader /> : "Publish Success Story"}
          </button>
        </form>
      </motion.div>

      {/* Display user's stories */}
      <div className="mt-8">
        <h2 className="mb-4 text-2xl font-bold">Your Stories</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {stories.map((story) => (
            <StoryCard
              key={story._id}
              id={story._id}
              title={story.title}
              description={story.description}
              image={story.image}
              email={story.email}
              onDelete={() => handleDeleteStory(story._id)}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default CreateSuccessStory;
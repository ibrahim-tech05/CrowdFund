import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { createCampaign } from "../../api/campaign";
import axios from "axios";
import imageCompression from "browser-image-compression";
import CircleLoader from "../../components/CircleLoader";

const CreateCampaign = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    goal: "",
    type: "",
    image: "",
  });

  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    setEmail(storedEmail || "");
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    if (!formData.goal || formData.goal < 100) newErrors.goal = "Minimum goal is $100";
    if (!formData.type.trim()) newErrors.type = "Type is required";
    if (!formData.image) newErrors.image = "Image is required";
    if (!email) newErrors.general = "User authentication failed";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const options = { 
        maxSizeMB: 1, 
        maxWidthOrHeight: 1024, 
        useWebWorker: true 
      };
      const compressedFile = await imageCompression(file, options);
      
      const imageFormData = new FormData();
      imageFormData.append("image", compressedFile);

      const response = await axios.post(
        "http://localhost:3000/api/images/upload", 
        imageFormData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setFormData(prev => ({ ...prev, image: response.data.imageUrl }));
      setErrors(prev => ({ ...prev, image: "" }));
    } catch (error) {
      setErrors(prev => ({ ...prev, image: "Image upload failed" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});
    setSuccess(false);

    try {
      await createCampaign({ ...formData, email });
      setSuccess(true);
      setFormData({ title: "", description: "", goal: "", type: "", image: "" });
    } catch (error) {
      setErrors({ general: "Failed to create campaign. Please try again." });
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
        <div className="px-8 py-6 bg-[#1a1a2e] text-white">
          <h1 className="text-3xl font-bold">Start a New Campaign</h1>
          <p className="mt-2 text-gray-300">Share your cause with the community</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Campaign Title
              </label>
              <input
                name="title"
                value={formData.title}
                onChange={(e) => {
                  setFormData(prev => ({ ...prev, title: e.target.value }));
                  setErrors(prev => ({ ...prev, title: "" }));
                }}
                className={`w-full p-3 rounded-lg border-2 ${
                  errors.title ? "border-red-500" : "border-gray-200"
                } focus:border-[#1a1a2e] focus:ring-1 focus:ring-[#1a1a2e] transition-all outline-none`}
              />
              {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Type
              </label>
              <input
                name="type"
                value={formData.type}
                onChange={(e) => {
                  setFormData(prev => ({ ...prev, type: e.target.value }));
                  setErrors(prev => ({ ...prev, type: "" }));
                }}
                className={`w-full p-3 rounded-lg border-2 ${
                  errors.type ? "border-red-500" : "border-gray-200"
                } focus:border-[#1a1a2e] focus:ring-1 focus:ring-[#1a1a2e] transition-all outline-none`}
              />
              {errors.title && <p className="mt-1 text-sm text-red-500">{errors.type}</p>}
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
              Description
              </label>
              <textarea
              
                name="description"
                value={formData.description}
                onChange={(e) => {
                  setFormData(prev => ({ ...prev, description: e.target.value }));
                  setErrors(prev => ({ ...prev, description: "" }));
                }}
                className={`w-full p-3 rounded-lg border-2 ${
                  errors.description ? "border-red-500" : "border-gray-200"
                } focus:border-[#1a1a2e] focus:ring-1 focus:ring-[#1a1a2e] transition-all outline-none`}
              />
              {errors.title && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Goal($)
              </label>
              <input
                name="goal"
                value={formData.goal}
                onChange={(e) => {
                  setFormData(prev => ({ ...prev, goal: e.target.value }));
                  setErrors(prev => ({ ...prev, goal: "" }));
                }}
                className={`w-full p-3 rounded-lg border-2 ${
                  errors.goal ? "border-red-500" : "border-gray-200"
                } focus:border-[#1a1a2e] focus:ring-2 focus:ring-[#1a1a2e] transition-all outline-none`}
              />
              {errors.title && <p className="mt-1 text-sm text-red-500">{errors.goal}</p>}
            </div>

            {/* Other form fields with similar structure */}

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Campaign Image
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="file"
                  onChange={handleImageUpload}
                  className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-[#1a1a2e] file:text-white
                    hover:file:bg-[#16213e] transition-colors"
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
              {errors.image && <p className="mt-1 text-sm text-red-500">{errors.image}</p>}
            </div>
          </div>

          {errors.general && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-3 text-red-700 bg-red-100 rounded-lg"
            >
              {errors.general}
            </motion.div>
          )}

          {success && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-3 text-green-700 bg-green-100 rounded-lg"
            >
              Campaign created successfully!
            </motion.div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-6 bg-gradient-to-r from-[#1a1a2e] to-[#16213e] text-white 
              rounded-lg font-semibold hover:shadow-lg transition-all 
              disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? <CircleLoader /> : "Launch Campaign"}
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default CreateCampaign;
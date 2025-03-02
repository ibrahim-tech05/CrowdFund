import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const CreateCampaign = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    goal: "",
    image: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Campaign Created:", formData);
  };

  return (
    <>
      <Navbar userRole="fundraiser" />

      <div className="min-h-screen bg-gradient-to-r from-[#1a1a2e] to-[#16213e] text-white p-8">
        <h1 className="text-3xl font-bold mb-8">Create a Campaign</h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white/10 p-6 rounded-lg shadow-lg"
        >
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full px-4 py-2 rounded-lg bg-white/20 text-white focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full px-4 py-2 rounded-lg bg-white/20 text-white focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Goal ($)</label>
            <input
              type="number"
              value={formData.goal}
              onChange={(e) =>
                setFormData({ ...formData, goal: e.target.value })
              }
              className="w-full px-4 py-2 rounded-lg bg-white/20 text-white focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Image URL</label>
            <input
              type="text"
              value={formData.image}
              onChange={(e) =>
                setFormData({ ...formData, image: e.target.value })
              }
              className="w-full px-4 py-2 rounded-lg bg-white/20 text-white focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="bg-[#1a1a2e] text-white px-6 py-2 rounded-full hover:bg-[#16213e] transition duration-300"
          >
            Create Campaign
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default CreateCampaign;

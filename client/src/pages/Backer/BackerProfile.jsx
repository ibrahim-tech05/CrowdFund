import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getBackerProfile, updateBackerProfile } from "../../api/backer";
import axios from "axios";

const BackerProfile = () => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    profilePicture: "",
    bio: "",
    phone: "",
    address: "",
    totalDonations: 0,
  });
  const [isEditing, setIsEditing] = useState(false);
  const email = localStorage.getItem("email");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const data = await getBackerProfile(email);
      setProfile(data);
    } catch (error) {
      toast.error("Failed to fetch profile details");
      console.error("Error fetching profile:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleProfilePictureUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post("http://localhost:3000/api/images/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setProfile({ ...profile, profilePicture: response.data.imageUrl });
      toast.success("Profile picture uploaded successfully!");
    } catch (error) {
      toast.error("Failed to upload profile picture");
      console.error("Error uploading image:", error);
    }
  };

  const handleSave = async () => {
    try {
      await updateBackerProfile(email, profile);
      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      toast.error("Failed to update profile");
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#f6f6f6] text-[#1a1a2e] p-8 ">
      <ToastContainer position="bottom-right" autoClose={3000} />
      <div className="max-w-4xl mx-auto">
        <h1 className="mb-8 text-4xl font-bold">Your Profile</h1>

        {/* Profile Picture Section */}
        <div className="flex items-center mb-8">
          <div className="relative w-32 h-32 overflow-hidden rounded-full">
            <img
              src={profile.profilePicture || "https://via.placeholder.com/150"}
              alt="Profile"
              className="object-cover w-full h-full"
            />
            {isEditing && (
              <label className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleProfilePictureUpload}
                />
                <span className="text-sm text-white">Upload</span>
              </label>
            )}
          </div>
        </div>

        {/* Profile Details Section */}
        <div className="p-6 rounded-lg shadow-lg bg-white/10">
          <h2 className="mb-6 text-2xl font-bold">Personal Information</h2>

          {/* Name */}
          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium">Name</label>
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleInputChange}
                className="w-full p-2 text-[#1a1a2e] rounded-lg bg-white/80 border-2  outline-none hover:border-[#1a1a2e] transition duration-300"
              />
            ) : (
              <p className="text-gray-300">{profile.name}</p>
            )}
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium">Email</label>
            <p className="text-gray-300">{profile.email}</p>
          </div>

          {/* Bio */}
          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium">Bio</label>
            {isEditing ? (
              <textarea
                name="bio"
                value={profile.bio}
                onChange={handleInputChange}
                className="w-full p-2 text-[#1a1a2e] rounded-lg bg-white/80 border-2  outline-none hover:border-[#1a1a2e] transition duration-300"
              />
            ) : (
              <p className="text-gray-300">{profile.bio || "No bio provided"}</p>
            )}
          </div>

          {/* Phone */}
          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium">Phone</label>
            {isEditing ? (
              <input
                type="text"
                name="phone"
                value={profile.phone}
                onChange={handleInputChange}
                className="w-full p-2 text-[#1a1a2e] rounded-lg bg-white/80 border-2  outline-none hover:border-[#1a1a2e] transition duration-300"
              />
            ) : (
              <p className="text-gray-300">{profile.phone || "No phone provided"}</p>
            )}
          </div>

          {/* Address */}
          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium">Address</label>
            {isEditing ? (
              <input
                type="text"
                name="address"
                value={profile.address}
                onChange={handleInputChange}
                className="w-full p-2 text-[#1a1a2e] rounded-lg bg-white/80 border-2  outline-none hover:border-[#1a1a2e] transition duration-300"
              />
            ) : (
              <p className="text-gray-300">{profile.address || "No address provided"}</p>
            )}
          </div>

          {/* Total Donations */}
          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium">Total Donations</label>
            <p className="text-gray-300">${profile.totalDonations}</p>
          </div>

          {/* Edit/Save Button */}
          <div className="flex justify-end mt-6">
            {isEditing ? (
              <button
                onClick={handleSave}
                className="bg-[#1a1a2e] text-white px-6 py-2 rounded-full hover:bg-[#16213e] transition duration-300"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-[#1a1a2e] text-white px-6 py-2 rounded-full hover:bg-[#16213e] transition duration-300"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BackerProfile;
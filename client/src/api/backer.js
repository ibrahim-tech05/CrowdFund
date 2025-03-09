import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api/backers";

// Get backer profile by email
export const getBackerProfile = async (email) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${email}`);
    return response.data;
  } catch (error) {
    console.log("Api error");
    throw error.response.data;
  }
};

// Update backer profile
export const updateBackerProfile = async (email, profileData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${email}`, profileData);
    return response.data;
  } catch (error) {
    console.log("Api error");
    throw error.response.data;
  }
};
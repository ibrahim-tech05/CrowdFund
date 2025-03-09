import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api/admin";

// Fetch all users
export const getAllUsers = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users`);
    return response.data;
  } catch (error) {
    console.log("API error");
    throw error.response?.data || "An error occurred";
  }
};

// Delete a user by ID
export const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/users/${userId}`);
    return response.data;
  } catch (error) {
    console.log("API error");
    throw error.response?.data || "An error occurred";
  }
};

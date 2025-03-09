import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api/success-stories";

// Create a new success story
export const createSuccessStory = async (storyData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}`, storyData);
    return response.data;
  } catch (error) {
    throw error.response?.data || "Failed to create story";
  }
};

// Fetch all success stories
export const getSuccessStories = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || "Failed to fetch stories";
  }
};

// Fetch success stories by logged-in user's email
export const getSuccessStoriesByEmail = async (email) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/email/${email}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || "Failed to fetch user stories";
  }
};

// Delete a success story by ID
export const deleteSuccessStory = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || "Failed to delete story";
  }
};

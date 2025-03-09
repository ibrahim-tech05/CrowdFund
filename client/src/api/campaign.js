import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api/campaigns";

// Create a new campaign
export const createCampaign = async (campaignData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}`, campaignData);
    return response.data;
  } catch (error) {
    console.log("Api error");
    throw error.response.data;
  }
};

// Get all campaigns
export const getCampaigns = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}`);
    return response.data;
  } catch (error) {
    console.log("Api error");
    throw error.response.data;
  }
};

// Get a single campaign by ID
export const getCampaignById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.log("Api error");
    throw error.response.data;
  }
};

// Update a campaign by ID
export const updateCampaign = async (id, campaignData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${id}`, campaignData);
    return response.data;
  } catch (error) {
    console.log("Api error");
    throw error.response.data;
  }
};

// Delete a campaign by ID
export const deleteCampaign = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.log("Api error");
    throw error.response.data;
  }
};

// Get campaigns by email (created by a specific user)
export const getCampaignsByEmail = async (email) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/email/${email}`);
    return response.data;
  } catch (error) {
    console.log("Api error");
    throw error.response.data;
  }
};

export const toggleBookmark = async (campaignId, email) => {
  console.log("Sending payload to backend:", { campaignId, email }); // Debugging

  try {
    const response = await axios.post(`${API_BASE_URL}/bookmark`, {
      campaignId,
      email,
    });
    return response.data;
  } catch (error) {
    console.log("Api error");
    throw error.response.data;
  }
};
// Get saved campaigns by email (bookmarked by a specific user)
export const getSavedCampaignsByEmail = async (email) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/saved/${email}`);
    return response.data;
  } catch (error) {
    console.log("Api error");
    throw error.response.data;
  }
};
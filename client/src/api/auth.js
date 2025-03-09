import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api/auth";

// Register a new user
export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/register`, userData);
    return response.data;
  } catch (error) {
    console.log("Api error");
    throw error.response.data;
  }
};

// Login a user
export const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, credentials);
    return response.data;
  } catch (error) {
    console.log("Api error");
    throw error.response.data;
  }
};
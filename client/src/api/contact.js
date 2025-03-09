import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api/contact";

// Send a contact message
export const sendContactMessage = async (contactData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}`, contactData);
    return response.data;
  } catch (error) {
    console.log("Api error");
    throw error.response.data;
  }
};
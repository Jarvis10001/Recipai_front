import axios from 'axios';

// Define API URL directly here
const API_URL = 'http://localhost:2006/api';

const getAuthConfig = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
});

export const userService = {
  // Get user profile data from backend
  getProfile: async () => {
    const response = await axios.get(`${API_URL}/users/profile`, getAuthConfig());
    return response.data;
  },

  // Update user profile information
  updateProfile: async (userData) => {
    const response = await axios.put(`${API_URL}/users/profile`, userData, getAuthConfig());
    return response.data;
  },

  // Handle password changes
  updatePassword: async (passwordData) => {
    const response = await axios.put(`${API_URL}/users/password`, passwordData, getAuthConfig());
    return response.data;
  },

  // Update user avatar
  updateAvatar: async (avatarUrl) => {
    const response = await axios.put(`${API_URL}/users/avatar`, { avatar: avatarUrl }, getAuthConfig());
    return response.data;
  }
};

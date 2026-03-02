import axios from 'axios';

// This will automatically use the correct URL based on where it's running
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

export default api;

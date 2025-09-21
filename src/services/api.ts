import axios from 'axios';

const api = axios.create({
  // This reads the backend URL from your frontend/.env file
  baseURL: import.meta.env.VITE_API_URL, 
});

// This is a "request interceptor". It's a powerful feature that
// automatically adds your login token to every single API request you make.
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    // The header 'x-auth-token' must match what your backend expects
    config.headers['x-auth-token'] = token;
  }
  return config;
});

export default api;
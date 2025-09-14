import axios from "axios";
import Cookies from "js-cookie";


export const axiosInstance = axios.create({
  baseURL: "https://temu-clone-backed.onrender.com/api/v1/",
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  // Note: Since the backend sets httpOnly cookies, we can't read them with JavaScript
  // The browser will automatically send the cookie with the request
  // The backend protectRoute middleware will check both Authorization header and cookies
  console.log("Admin axios interceptor - Request being sent with credentials");
  return config;
});

// Response interceptor to handle token expiration
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      Cookies.remove("token");
      console.log("Authentication failed, please login again");
    }
    return Promise.reject(error);
  }
);
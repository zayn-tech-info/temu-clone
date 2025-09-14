import axios from "axios";
import Cookies from "js-cookie";

export const axiosInstance = axios.create({
  baseURL: "https://temu-clone-backed.onrender.com/",
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  console.log("Axios interceptor - Request being sent with credentials");
  return config;
});

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

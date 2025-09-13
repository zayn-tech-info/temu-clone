import axios from "axios";
import Cookies from "js-cookie";


export const axiosInstance = axios.create({
  baseURL: "https://temu-clone-backed.onrender.com/api/v1/",
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const token = Cookies.get("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    console.log("Token not found");
  }
  return config;
});
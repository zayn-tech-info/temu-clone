import axios from "axios";
import Cookies from "js-cookie";

const mode = import.meta.env.MODE;
const baseURL =
  mode === "development"
    ? "http://localhost:3000/"
    : "https://temu-clone-backed.onrender.com/";

console.log("🌐 Axios configured for mode:", mode);
console.log("🔗 Base URL:", baseURL);

export const axiosInstance = axios.create({
  baseURL: baseURL,
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
      // Token cookie is httpOnly; client can't clear it. Server should on logout.
      Cookies.remove("token");
      console.log("Authentication failed, please login again");
    }
    return Promise.reject(error);
  }
);

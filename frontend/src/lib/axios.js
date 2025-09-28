import axios from "axios";
import Cookies from "js-cookie";

const mode = import.meta.env.MODE;
const baseURL =
  mode === "development"
    ? "http://localhost:3000/"
    : "https://temu-clone-backed.onrender.com/";

export const axiosInstance = axios.create({
  baseURL: baseURL,
  withCredentials: true,
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

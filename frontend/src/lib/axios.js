import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://temu-clone-backed.onrender.com/api/v1/auth/",
  withCredentials: true,
});

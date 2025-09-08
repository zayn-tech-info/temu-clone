import axios from "axios";
export const axiosInstance = axios.create({
  baseURL: "https://products-api-7byt.onrender.com/api/v1/",
  withCredentials: true,
});

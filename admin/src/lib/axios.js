import axios from "axios";
export const axiosInstance = axios.create({
  baseURL: "https://temu-clone-backed.onrender.com/api/v1/",
  withCredentials: true,
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4YmRkN2Y2MjdhMjU1NWE0M2Y1YzE4ZCIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzU3MzcyODMyLCJleHAiOjE3NTc5Nzc2MzJ9.JzXkZ492YGhiD07Tk5hmGKegOMnaMsjrZWSZkyeqEsA`,
  },
});

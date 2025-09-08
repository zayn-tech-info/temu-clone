import axios from "axios";
export const axiosInstance = axios.create({
  baseURL: "https://temu-clone-backed.onrender.com/api/v1/",
  withCredentials: true,
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4YmRkN2Y2MjdhMjU1NWE0M2Y1YzE4ZCIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc1NzM3Mjk0NiwiZXhwIjoxNzU3OTc3NzQ2fQ.y_XcCUpZeLTau8Gk8tn6NV_BEWjybIqHghLkNdHROss`,
  },
});

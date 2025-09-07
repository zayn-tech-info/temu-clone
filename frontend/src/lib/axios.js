import axios from "axios"

export const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api/v1/",
  // headers: {Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4YmJiNjMwZmE5ODVhOTY1OWU3ZTkyMCIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc1NzEzMjM2MywiZXhwIjoxNzU3NzM3MTYzfQ.FdsvWYTxRxlSq1VebSw7wk9h0RzXegG5S7WUeXOhQ8s`},
  // withCredentials: true,
});


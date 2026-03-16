import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5000",
  //baseURL = "https://oauth-backend-8a74.onrender.com/api",
  withCredentials: true
});

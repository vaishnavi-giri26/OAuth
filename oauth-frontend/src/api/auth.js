import axios from "axios";

export const api = axios.create({
  baseURL: "https://oauth-backend-s5bk.onrender.com",
  withCredentials: true
});

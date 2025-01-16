import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "development" ? "http://localhost:5000/api" : "/",
  headers: { 
    "Content-Type": "application/json",
    "Cache-Control": "no-cache",
    Pragma: "no-cache",
 },
});

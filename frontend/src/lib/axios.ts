import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api", // Replace with your backend URL
  headers: { 
    "Content-Type": "application/json",
    "Cache-Control": "no-cache",
    Pragma: "no-cache",
 },
});

// src/apis/config.js
import axios from "axios";

const instance = axios.create({
  baseURL: "https://hossam599.pythonanywhere.com/api",
});

// Add Token For every Request
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

export default instance;

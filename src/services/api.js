import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  const publicUrls = [
    "/users/login/",
    "/users/signup/",
  ];

  if (token && !publicUrls.includes(config.url)) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});


export default api;
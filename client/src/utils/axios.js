import axios from "axios";
import { BASE_URL } from "../constants/apiUrl";

const instance = axios.create({
  baseURL: `${BASE_URL}/api`,
  withCredentials:true
})

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;

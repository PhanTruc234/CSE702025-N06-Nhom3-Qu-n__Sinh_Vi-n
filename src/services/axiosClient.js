import axios from "axios";
const BASE_URL = "http://localhost:3100";
export const axiosClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});
export const rawAxios = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});
// axiosClient.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

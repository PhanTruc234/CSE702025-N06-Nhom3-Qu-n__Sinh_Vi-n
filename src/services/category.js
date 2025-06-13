import axios from "axios";
import { API_CATEGORY } from "../constants/api";

const category = {
  fetchCategory: async (dataCate) => {
    return axios.post(API_CATEGORY, dataCate);
  },
  renderCate: async () => {
    return axios.get(API_CATEGORY);
  },
  renderCatePage: async (page, limit) => {
    return await axios.get(`${API_CATEGORY}?page=${page}&limit=${limit}`);
  },
  removeCate: async (id) => {
    return axios.delete(`${API_CATEGORY}/${id}`);
  },
  editCate: async (data) => {
    return axios.put(`${API_CATEGORY}/${data.id}`, data);
  },
};
export default category;

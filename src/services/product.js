import axios from "axios";
import { API_PRODUCT } from "../constants/api";

export const product = {
  fetchProduct: async (data) => {
    return await axios.post(API_PRODUCT, data);
  },
  renderProduct: async () => {
    return await axios.get(API_PRODUCT);
  },
  renderProductPage: async (page = 1, limit = 4) => {
    return await axios.get(`${API_PRODUCT}?page=${page}&limit=${limit}`);
  },
  renderProductByCate: async ({ category, name }) => {
    return await axios.get(`${API_PRODUCT}?category=${category}&name=${name}`);
  },
  renderProductByName: async ({ name }) => {
    return await axios.get(`${API_PRODUCT}?name=${name}`);
  },
  editProduct: async (data) => {
    console.log(data, "dâtt");
    return await axios.put(`${API_PRODUCT}/${data.id}`, data);
  },
  deleteProduct: async (data) => {
    return await axios.delete(`${API_PRODUCT}/${data.id}`);
  },
};

import axios from "axios";
import { API_CART } from "../constants/api";

const cart = {
  fetchCart: async (data) => {
    return await axios.post(API_CART, data);
  },
  renderCart: async () => {
    return await axios.get(API_CART);
  },
  updateQuantity: async (id, quantity) => {
    return await axios.put(`${API_CART}/${id}`, { quantity });
  },
  removeCart: async (id) => {
    return await axios.delete(`${API_CART}/${id}`);
  },
};
export default cart;

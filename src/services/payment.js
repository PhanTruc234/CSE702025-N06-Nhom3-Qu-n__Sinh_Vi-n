import axios from "axios";
import { API_PAYMENT } from "../constants/api";

const payment = {
  fetchPayment: async (data) => {
    console.log(data, "fvnjfnbjgnbjgbjgnhknghryfge");
    return await axios.post(API_PAYMENT, data);
  },
  renderPay: async () => {
    return await axios.get(API_PAYMENT);
  },
};
export default payment;

import { API_REGISTER } from "../constants/api";
import axios from "axios";

const auth = {
  authRegister: async (dataRegister) => {
    return await axios.post(API_REGISTER, dataRegister);
  },
  authCheck: async (dataCheck) => {
    return await axios.get(API_REGISTER, { params: dataCheck });
  },
  authRegisterCheck: async (dataCheck) => {
    return await axios.get(API_REGISTER, dataCheck);
  },
  renderUser: async () => {
    return await axios.get(API_REGISTER);
  },
  removeUser: async (id) => {
    return await axios.delete(`${API_REGISTER}/${id}`);
  },
};
export default auth;

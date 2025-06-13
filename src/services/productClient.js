import axios from "axios";
import {
  API_DATA_CATEGORY_LIST,
  API_DATA_PRODUCT,
  API_FILTER_CATE,
} from "../constants/api";

const productClient = {
  fetchDataProduct: async ({ search, order, sortBy, limit, skip }) => {
    return await axios.get(
      `${API_DATA_PRODUCT}/search?q=${search}&order=${order}&sortBy=${sortBy}&limit=${limit}&skip=${skip}`
    );
  },
  fetchCategoryList: async () => {
    return await axios.get(API_DATA_CATEGORY_LIST);
  },
  renderCateItem: async (cate) => {
    return await axios.get(`${API_FILTER_CATE}/${cate}`);
  },
};
export default productClient;

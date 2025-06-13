import { createSlice } from "@reduxjs/toolkit";

const productClientSlice = createSlice({
  name: "productClientSlice",
  initialState: {
    products: [],
    categoryList: [],
  },
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setCategoryList: (state, action) => {
      state.categoryList = action.payload;
    },
  },
});
export default productClientSlice.reducer;
export const { setProducts, setCategoryList } = productClientSlice.actions;

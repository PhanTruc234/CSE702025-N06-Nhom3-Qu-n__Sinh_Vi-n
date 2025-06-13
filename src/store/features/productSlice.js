import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "productSlice",
  initialState: {
    produc: [],
    editProduct: null,
    length: null,
  },
  reducers: {
    setProduct: (state, action) => {
      state.produc = action.payload.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    },
    addProduct: (state, action) => {
      state.produc.unshift(action.payload);
    },
    editProductNew: (state, action) => {
      const index = state.produc.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.produc[index] = action.payload;
      }
    },
    setEditProduct: (state, action) => {
      state.editProduct = action.payload;
    },
    removeProduct: (state, action) => {
      state.produc = state.produc.filter(
        (item) => item.id !== action.payload.id
      );
    },
    lengthProduct: (state, action) => {},
  },
});
export default productSlice.reducer;
export const {
  setProduct,
  addProduct,
  editProductNew,
  setEditProduct,
  removeProduct,
} = productSlice.actions;

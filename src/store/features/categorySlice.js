import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
  name: "categorySlice",
  initialState: {
    cate: [],
    length: null,
  },
  reducers: {
    setCategories: (state, action) => {
      console.log(action.payload, "ffgj");
      state.cate = action.payload.sort(
        (a, b) => new Date(b.createAt) - new Date(a.createAt)
      );
    },
    addCategory: (state, action) => {
      state.cate.unshift(action.payload);
      console.log(state.cate, "pppppp");
    },
    removeCategory: (state, action) => {
      const { id } = action.payload;
      state.cate = state.cate.filter((item) => item.id !== id);
    },
    editCategory: (state, action) => {
      const { id, name, slug, description, images } = action.payload;
      state.cate = state.cate.map((item) =>
        item.id === id
          ? {
              ...item,
              name,
              slug,
              description,
              images,
            }
          : item
      );
    },
    lengthCate: (state, action) => {
      state.length = action.payload;
    },
  },
});
export default categorySlice.reducer;
export const {
  setCategories,
  addCategory,
  removeCategory,
  editCategory,
  lengthCate,
} = categorySlice.actions;

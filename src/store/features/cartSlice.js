import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cartSlice",
  initialState: {
    cart: [],
  },
  reducers: {
    setCart: (state, action) => {
      state.cart = action.payload;
    },
    addCart: (state, action) => {
      const existingItem = state.cart.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        state.cart = state.cart.map((item) =>
          item.id === action.payload.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      } else {
        state.cart.unshift({ ...action.payload, quantity: 1 });
      }
    },
    increment: (state, action) => {
      state.cart = state.cart.map((item) =>
        item.id === action.payload
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      );
    },
    decrement: (state, action) => {
      state.cart = state.cart.map((item) =>
        item.id === action.payload
          ? {
              ...item,
              quantity: item.quantity - 1,
            }
          : item
      );
    },
    deleteCart: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    },
    resetCart: (state) => {
      state.cart = [];
    },
  },
});

export default cartSlice.reducer;
export const { setCart, addCart, increment, decrement, deleteCart, resetCart } =
  cartSlice.actions;

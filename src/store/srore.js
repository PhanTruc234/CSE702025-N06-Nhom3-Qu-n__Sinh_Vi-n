import { configureStore } from "@reduxjs/toolkit";
import authenSlice from "./features/authenSlice";
import categorySlice from "./features/categorySlice";
import productSlice from "./features/productSlice";
import cartSlice from "./features/cartSlice";
import paymentSlice from "./features/paymentSlice";
export const store = configureStore({
  reducer: {
    authenSlice: authenSlice,
    categorySlice: categorySlice,
    productSlice: productSlice,
    cartSlice: cartSlice,
    paymentSlice: paymentSlice,
  },
});

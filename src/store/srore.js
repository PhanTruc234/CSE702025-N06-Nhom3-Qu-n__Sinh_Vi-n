import { configureStore } from "@reduxjs/toolkit";
import authenSlice from "./features/authenSlice";
import categorySlice from "./features/categorySlice";
import productSlice from "./features/productSlice";
import cartSlice from "./features/cartSlice";
import productClientSlice from "./features/productClientSlice";
import paymentSlice from "./features/paymentSlice";
export const store = configureStore({
  reducer: {
    authenSlice: authenSlice,
    categorySlice: categorySlice,
    productSlice: productSlice,
    cartSlice: cartSlice,
    productClientSlice: productClientSlice,
    paymentSlice: paymentSlice,
  },
});

import { createSlice } from "@reduxjs/toolkit";

const paymentSlice = createSlice({
  name: "paymentSlice",
  initialState: {
    pay: [],
  },
  reducers: {
    setPayment: (state, action) => {
      state.pay = action.payload;
    },
    addPayment: (state, action) => {
      state.pay.unshift(action.payload);
    },
  },
});
export default paymentSlice.reducer;
export const { setPayment, addPayment } = paymentSlice.actions;

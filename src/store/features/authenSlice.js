import { createSlice } from "@reduxjs/toolkit";
const authenSlice = createSlice({
  name: "authenSlice",
  initialState: {
    info: JSON.parse(localStorage.getItem("user")) || null,
  },
  reducers: {
    doLogin: (state, action) => {
      state.info = action.payload;
      localStorage.setItem("user", JSON.stringify(state.info));
    },
    doLogout: (state) => {
      state.info = null;
      localStorage.removeItem("user");
      localStorage.removeItem("info");
      localStorage.removeItem("pay");
    },
  },
});
export default authenSlice.reducer;
export const { doLogin, doLogout } = authenSlice.actions;

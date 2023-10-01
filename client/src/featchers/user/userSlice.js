import { createSlice } from "@reduxjs/toolkit";
import { updateUserData } from "./userActions";

const initialState = {
  loading: false,
  userData: null,
  userError: "",
  success: false,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userReset: (state) => {
      state.loading = false;
      state.userData = null;
      state.success = false;
      state.userError = "";
    },
  },
  extraReducers: {
    [updateUserData.pending]: (state) => {
      state.loading = true;
    },
    [updateUserData.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.userData = payload;
    },
    [updateUserData.rejected]: (state, { payload }) => {
      state.loading = false;
      state.success = false;
      state.userError = payload;
    },
  },
});
export const { userReset } = userSlice.actions;
export default userSlice.reducer;

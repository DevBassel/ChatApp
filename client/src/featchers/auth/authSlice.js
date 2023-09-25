import { createSlice } from "@reduxjs/toolkit";
import { getMe, logOut, login, register, verfiyEmail } from "./authActions";

let user = localStorage.USER_DATA ? JSON.parse(localStorage.USER_DATA) : null;

const initialState = {
  loading: false,
  success: false,
  user,
  error: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authReset: (state) => {
      state.error = "";
      state.loading = false;
      state.success = false;
    },
  },
  extraReducers: {
    [login.pending]: (state) => {
      state.loading = true;
    },
    [login.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.user = payload;
    },
    [login.rejected]: (state, { payload }) => {
      state.loading = false;
      state.success = false;
      state.error = payload;
    },

    [register.pending]: (state) => {
      state.loading = true;
    },
    [register.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.user = payload;
    },
    [register.rejected]: (state, { payload }) => {
      state.loading = false;
      state.success = false;
      state.error = payload;
    },
    [verfiyEmail.pending]: (state) => {
      state.loading = true;
    },
    [verfiyEmail.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.user = payload;
    },
    [verfiyEmail.rejected]: (state, { payload }) => {
      state.loading = false;
      state.success = false;
      state.error = payload;
    },
    [logOut.pending]: (state) => {
      state.loading = true;
    },
    [logOut.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.user = payload;
    },
    [logOut.rejected]: (state, { payload }) => {
      state.loading = false;
      state.success = false;
      state.error = payload;
    },
    [getMe.pending]: (state) => {
      state.loading = true;
    },
    [getMe.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.user = payload;
    },
    [getMe.rejected]: (state, { payload }) => {
      state.loading = false;
      state.success = false;
      state.error = payload;
    },
  },
});

export const { authReset, authErr } = authSlice.actions;

export default authSlice.reducer;

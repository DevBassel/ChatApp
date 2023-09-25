import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  msg: "",
};

const errorSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    addError: (state, { payload }) => {
      state.msg = payload;
    },
    errReset: (state) => {
      state.msg = "";
    },
  },
});

export const { addError, errReset } = errorSlice.actions;
export default errorSlice.reducer;

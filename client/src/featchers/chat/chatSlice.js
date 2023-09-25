import { createSlice } from "@reduxjs/toolkit";
import { getMyChats } from "./chatActions";

const initialState = {
  loading: false,
  success: false,
  chats: [],
  chatErr: "",
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    chatReset: (state) => {
      state.loading = false;
      state.success = false;
      state.chats = [];
      state.chatErr = "";
    },
  },
  extraReducers: {
    [getMyChats.pending]: (state) => {
      state.loading = true;
    },
    [getMyChats.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.chats = payload;
    },
    [getMyChats.rejected]: (state, { payload }) => {
      state.loading = false;
      state.success = false;
      state.chatErr = payload;
    },
  },
});

export const { chatReset } = chatSlice.actions;
export default chatSlice.reducer;

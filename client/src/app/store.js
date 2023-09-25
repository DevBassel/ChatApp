import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../featchers/auth/authSlice";
import errorSlice from "../featchers/error/errorSlice";
import chatSlice from "../featchers/chat/chatSlice";
export const store = configureStore({
  reducer: {
    auth: authSlice,
    chat: chatSlice,
    error: errorSlice,
  },
});

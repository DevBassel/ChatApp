import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../featchers/auth/authSlice";
import errorSlice from "../featchers/error/errorSlice";
import chatSlice from "../featchers/chat/chatSlice";
import userSlice from "../featchers/user/userSlice";
export const store = configureStore({
  reducer: {
    auth: authSlice,
    chat: chatSlice,
    user: userSlice,
    error: errorSlice,
  },
});

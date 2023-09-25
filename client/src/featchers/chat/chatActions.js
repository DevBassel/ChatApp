import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const API = "/api";

export const getMyChats = createAsyncThunk(
  "chat/myChats",

  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(API + "/chat", { withCredentials: true });
      return res.data;
    } catch (error) {
      if (error.response && error.response.data)
        return rejectWithValue(error.response.data.error);
      else return rejectWithValue(error.message);
    }
  }
);

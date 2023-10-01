import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = "/api/users";
export const updateUserData = createAsyncThunk(
  "user/updateData",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API}`, data, {
        withCredentials: true,
      });

      return response.data;
    } catch (error) {
      if (error.response && error.response.data)
        return rejectWithValue(error.response.data.error);
      else return rejectWithValue(error.message);
    }
  }
);

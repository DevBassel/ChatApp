import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = "/api";

export const login = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API}/auth/login`, data, {
        withCredentials: true,
      });
      localStorage.USER_DATA = JSON.stringify(res.data);
      return res.data;
    } catch (error) {
      if (error.response && error.response.data)
        return rejectWithValue(error.response.data.error);
      else return rejectWithValue(error.message);
    }
  }
);
export const register = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API}/auth/register`, data, {
        withCredentials: true,
      });

      localStorage.USER_DATA = JSON.stringify(res.data);

      return res.data;
    } catch (error) {
      if (error.response && error.response.data)
        return rejectWithValue(error.response.data.error);
      else return rejectWithValue(error.message);
    }
  }
);

export const verfiyEmail = createAsyncThunk(
  "auth/verify",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API}/auth/verify`, data, {
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      if (error.response && error.response.data)
        return rejectWithValue(error.response.data.error);
      else return rejectWithValue(error.message);
    }
  }
);

export const logOut = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await axios.post(`${API}/auth/logout`, {}, { withCredentials: true });
      localStorage.removeItem("USER_DATA");
      return null;
    } catch (error) {
      if (error.response && error.response.data)
        return rejectWithValue(error.response.data.error);
      else return rejectWithValue(error.message);
    }
  }
);

export const getMe = createAsyncThunk(
  "auth/getMe",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API}/users/me`, {
        withCredentials: true,
      });
      localStorage.USER_DATA = JSON.stringify(res.data);
      return res.data;
    } catch (error) {
      if (error.response && error.response.data)
        return rejectWithValue(error.response.data.error);
      else return rejectWithValue(error.message);
    }
  }
);

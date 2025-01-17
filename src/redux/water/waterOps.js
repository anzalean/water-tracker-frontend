import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../user/userOps";

// Add Water
export const addWater = createAsyncThunk(
  "water/addWater",
  async (water, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/water", water);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Update Water
export const updateWater = createAsyncThunk(
  "water/updateWater",
  async ({ cardId, waterData }, thunkAPI) => {
    try {
      const response = await axiosInstance.patch(`/water/${cardId}`, waterData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Delete Water
export const deleteWater = createAsyncThunk(
  "water/deleteWater",
  async (cardId, thunkAPI) => {
    try {
      await axiosInstance.delete(`/water/${cardId}`);
      return cardId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Get Day Water
export const getDayWater = createAsyncThunk(
  "water/getDayWater",
  async (date, thunkAPI) => {
    try {
      const response = await axiosInstance.get("/water/day", {
        params: { date },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Get Month Water
export const getMonthWater = createAsyncThunk(
  "water/getMonthWater",
  async (date, thunkAPI) => {
    try {
      const response = await axiosInstance.get("/water/month", {
        params: { date },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

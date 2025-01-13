import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../user/userOps';

// Add Water
export const addWater = createAsyncThunk(
  'water/addWater',
  async (water, thunkAPI) => {
    try {
      const response = await axiosInstance.post('/water', water);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Update Water
export const updateWater = createAsyncThunk(
  'water/updateWater',
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
  'water/deleteWater',
  async (cardId, thunkAPI) => {
    try {
      const response = await axiosInstance.delete(`/water/${cardId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Get Day Water
export const getDayWater = createAsyncThunk(
  'water/getDayWater',
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get('/water/day');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Get Month Water
export const getMonthWater = createAsyncThunk(
  'water/getMonthWater',
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get('/water/month');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Get Today Summary Water
export const getTodaySummaryWater = createAsyncThunk(
  'water/getTodaySummaryWater',
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get('/water/today');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
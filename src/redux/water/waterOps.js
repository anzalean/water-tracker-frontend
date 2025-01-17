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
    console.log("Update Request", cardId, waterData);
    try {
      const response = await axiosInstance.patch(`/water/${cardId}`, waterData);
      console.log("Response", response.data);
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
      const response = await axiosInstance.delete(`/water/${cardId}`);
      return response.data;
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
      console.log(response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Get Month Water
export const getMonthWater = createAsyncThunk(
  "water/getMonthWater",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get("/water/month");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Get Today Summary Water
// export const getTodaySummaryWater = createAsyncThunk(
//   "water/getTodaySummaryWater",
//   async (_, thunkAPI) => {
//     try {
//       const response = await axiosInstance.get("/water/today");
//       return response.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

// {
//     "status": 201,
//     "message": "Successfully created a water card!",
//     "data": {
//         "date": "2025-01-12T18:15:00.000Z",
//         "amount": 250,
//         "owner": "67863ff9e5607435d78d5555",
//         "_id": "678977ad9a497ebc7bb2abaf",
//         "createdAt": "2025-01-16T21:18:37.189Z",
//         "updatedAt": "2025-01-16T21:18:37.189Z"
//     }
// }

// {
//     "status": 200,
//     "message": "Daily water cards",
//     "data": {
//         "date": "2025-01-16T18:15:00.000Z",
//         "totalDayWater": 750,
//         "consumedWaterData": [
//             {
//                 "_id": "67898ef49ab5a44959806f7f",
//                 "date": "2025-01-16T23:26:00.000Z",
//                 "amount": 150
//             },
//             {
//                 "_id": "678994129ab5a44959806f8f",
//                 "date": "2025-01-16T00:21:00.000Z",
//                 "amount": 200
//             },
//             {
//                 "_id": "678999589ab5a44959806fbb",
//                 "date": "2025-01-16T00:44:00.000Z",
//                 "amount": 150
//             },
//             {
//                 "_id": "678999a39ab5a44959806fbf",
//                 "date": "2025-01-16T00:45:00.000Z",
//                 "amount": 250
//             }
//         ],
//         "owner": "67863ff9e5607435d78d5555"
//     }
// }

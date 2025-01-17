import { createSlice } from "@reduxjs/toolkit";
import {
  addWater,
  deleteWater,
  getDayWater,
  getMonthWater,
  updateWater,
} from "./waterOps";

import { isSameDay } from "date-fns";
import { signOut } from "../user/userOps";

const initialState = {
  date: new Date().toISOString(),
  totalDayWater: 0,
  items: [],
  monthItems: [],
  loading: false,
  error: null,
};

const waterSlice = createSlice({
  name: "water",
  initialState,
  extraReducers: (builer) =>
    builer
      .addCase(addWater.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addWater.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        console.log(action.payload.data);

        const newItem = action.payload.data;
        state.items.push(newItem);
        state.totalDayWater += newItem.amount;
        const addedDate = new Date(newItem.date);
        const addedDateString = addedDate.toISOString().split("T")[0];
        const existingMonthItem = state.monthItems.find(
          (item) => item.date === addedDateString
        );
        if (existingMonthItem) {
          existingMonthItem.totalDayWater += newItem.amount;
        } else {
          state.monthItems.push({
            date: addedDateString,
            totalDayWater: newItem.amount,
          });
        }
      })
      .addCase(addWater.rejected, (state, action) => {
        state.loading = false;
        if (typeof action.payload === "string") {
          state.error = action.payload;
        } else {
          state.error = "Failed to add water.";
        }
      })

      .addCase(deleteWater.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteWater.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        const id = action.payload._id;

        const deletedWaterIndex = state.items.findIndex(
          (item) => item._id === id
        );

        if (deletedWaterIndex === -1) return;
        const deletedWater = state.items[deletedWaterIndex];
        state.totalDayWater -= deletedWater.amount;
        state.items.splice(deletedWaterIndex, 1);
        const deletedDate = new Date(deletedWater.date);
        const deletedDateString = deletedDate.toISOString().split("T")[0];
        const existingMonthItem = state.monthItems.find(
          (item) => item.date === deletedDateString
        );
        if (existingMonthItem) {
          existingMonthItem.totalDayWater -= deletedWater.amount;
          if (existingMonthItem.totalDayWater <= 0) {
            state.monthItems = state.monthItems.filter(
              (item) => item.date !== deletedDateString
            );
          }
        }
      })
      .addCase(deleteWater.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to delete water.";
      })

      .addCase(updateWater.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateWater.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        const updatedWaterIndex = state.items.findIndex(
          (item) => item._id === action.payload._id
        );

        if (updatedWaterIndex === -1) return;

        const prevWater = state.items[updatedWaterIndex];
        const prevAmount = prevWater.amount;
        const newAmount = action.payload.amount;
        state.items[updatedWaterIndex] = action.payload;
        state.totalDayWater += newAmount - prevAmount;

        const updatedDate = new Date(action.payload.date);
        const updatedDateString = updatedDate.toISOString().split("T")[0];

        const existingMonthItem = state.monthItems.find(
          (item) => item.date === updatedDateString
        );

        if (existingMonthItem) {
          existingMonthItem.totalDayWater += newAmount - prevAmount;
        } else {
          state.monthItems.push({
            date: updatedDateString,
            totalDayWater: newAmount,
          });
        }
      })
      .addCase(updateWater.rejected, (state, action) => {
        state.loading = false;
        if (typeof action.payload === "string") {
          state.error = action.payload;
        } else {
          state.error = "Failed to update water.";
        }
      })

      .addCase(getDayWater.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDayWater.fulfilled, (state, action) => {
        console.log("get Water Day");
        state.error = null;
        state.loading = false;
        state.date = action.payload.data.date;
        state.totalDayWater = action.payload.data.totalDayWater;
        state.items = action.payload.data.consumedWaterData;
      })
      .addCase(getDayWater.rejected, (state, action) => {
        state.loading = false;
        if (typeof action.payload === "string") {
          state.error = action.payload;
        } else {
          state.error = "Failed to fetch water data.";
        }
      })

      // .addCase(getTodaySummaryWater.pending, (state) => {
      //   state.error = false;
      // })
      // .addCase(getTodaySummaryWater.fulfilled, (state, action) => {
      //   state.todaySumamryWater = action.payload;
      // })
      // .addCase(getTodaySummaryWater.rejected, (state) => {
      //   state.error = true;
      // })

      .addCase(getMonthWater.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMonthWater.fulfilled, (state, action) => {
        state.monthItems = action.payload;
      })
      .addCase(getMonthWater.rejected, (state) => {
        state.error = true;
      })

      .addCase(signOut.fulfilled, () => {
        return initialState;
      }),
});

export const waterReducer = waterSlice.reducer;

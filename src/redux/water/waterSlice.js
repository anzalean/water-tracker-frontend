import { createSlice } from "@reduxjs/toolkit";
import {
  addWater,
  deleteWater,
  getDayWater,
  getMonthWater,
  updateWater,
} from "./waterOps";
import { signOut } from "../user/userOps";

const initialState = {
  date: new Date().toISOString(),
  calendarMonth: new Date().toISOString(),
  totalDayWater: 0,
  items: [],
  monthItems: [],
  loading: false,
  error: null,
};

const waterSlice = createSlice({
  name: "water",
  initialState,
  reducers: {
    setCalendarMonth: (state, action) => {
      state.calendarMonth = action.payload;
    },
    setWaterDate: (state, action) => {
      state.date = action.payload;
    },
  },
  extraReducers: (builer) =>
    builer
      .addCase(addWater.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addWater.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        const newItem = action.payload.data;
        state.items.push(newItem);
        state.totalDayWater += newItem.amount;
        const addedDate = new Date(newItem.date);
        addedDate.setUTCHours(0, 0, 0, 0);
        const addedDateString = addedDate.toISOString();

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

        const id = action.payload;

        const deletedWaterIndex = state.items.findIndex(
          (item) => item._id === id
        );

        if (deletedWaterIndex === -1) return;
        const deletedWater = state.items[deletedWaterIndex];
        state.totalDayWater -= deletedWater.amount;
        state.items.splice(deletedWaterIndex, 1);

        const deletedDate = new Date(deletedWater.date);
        deletedDate.setUTCHours(0, 0, 0, 0);
        const deletedDateString = deletedDate.toISOString();

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
        const newItem = action.payload.data;

        const updatedWaterIndex = state.items.findIndex(
          (item) => item._id === newItem._id
        );
        if (updatedWaterIndex === -1) return;

        const prevAmount = state.items[updatedWaterIndex].amount;
        const newAmount = newItem.amount;
        state.items[updatedWaterIndex] = newItem;
        state.totalDayWater = Math.max(
          0,
          state.totalDayWater + newAmount - prevAmount
        );

        const updatedDate = new Date(newItem.date);
        updatedDate.setUTCHours(0, 0, 0, 0);
        const updatedDateString = updatedDate.toISOString();
        const existingMonthItem = state.monthItems.find(
          (item) => item.date === updatedDateString
        );

        if (existingMonthItem) {
          existingMonthItem.totalDayWater = Math.max(
            0,
            existingMonthItem.totalDayWater + newAmount - prevAmount
          );
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

      .addCase(getMonthWater.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMonthWater.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.monthItems = action.payload.data;
      })
      .addCase(getMonthWater.rejected, (state, action) => {
        state.error = true;
        if (typeof action.payload === "string") {
          state.error = action.payload;
        } else {
          state.error = "Failed to fetch water month.";
        }
      })

      .addCase(signOut.fulfilled, () => {
        return initialState;
      }),
});

export const waterReducer = waterSlice.reducer;
export const { setCalendarMonth, setWaterDate } = waterSlice.actions;

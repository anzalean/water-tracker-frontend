import { createSelector } from "@reduxjs/toolkit";
import { selectDesiredVolume } from "../user/selectors";

export const selectWater = (state) => state.water;
export const selectTotalDayWater = (state) => state.water.totalDayWater;
export const selectWaterItems = (state) => state.water.items;
export const selectWaterDate = (state) => state.water.date;
export const selectWaterLoading = (state) => state.water.loading;
export const selectError = (state) => state.water.error;
export const selectMonthWater = (state) => state.water.monthItems;
export const selectCalendarMonth = (state) => state.water.calendarMonth;

export const selectWaterProgress = createSelector(
  [selectDesiredVolume, selectTotalDayWater],
  (desiredVolume, totalDayWater) => {
    return desiredVolume
      ? Math.min((totalDayWater / (desiredVolume * 1000)) * 100, 100)
      : 0;
  }
);

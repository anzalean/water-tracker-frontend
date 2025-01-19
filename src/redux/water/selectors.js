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

export const selectCurrentDay = createSelector(
  [selectCalendarMonth, selectWaterDate],
  (calendarMonth, waterDate) => {
    if (!calendarMonth) return "Today";

    const date = new Date(waterDate);
    const today = new Date();

    const isToday =
      date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() &&
      date.getDate() === today.getDate();

    if (isToday) {
      return "Today";
    }

    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "long" });

    return `${day}, ${month}`;
  }
);

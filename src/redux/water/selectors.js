import { createSelector } from "@reduxjs/toolkit";
import { selectDesiredVolume } from "../user/selectors";
import { isToday } from "../../helpers/isToday";

export const selectWater = (state) => state.water;
export const selectTotalDayWater = (state) => state.water.totalDayWater;
export const selectWaterItems = (state) => state.water.items;
export const selectWaterDate = (state) => state.water.date;
export const selectWaterLoading = (state) => state.water.loading;
export const selectError = (state) => state.water.error;
export const selectMonthWater = (state) => state.water.monthItems;
export const selectCalendarMonth = (state) => state.water.calendarMonth;

export const selectWaterProgress = createSelector(
  [selectDesiredVolume, selectTotalDayWater, selectWaterDate],
  (desiredVolume, totalDayWater, currentDate) => {
    if (!isToday(currentDate)) return null;
    if (!desiredVolume || desiredVolume <= 0) {
      return 0;
    }

    return Math.min((totalDayWater / (desiredVolume * 1000)) * 100, 100);
  }
);

export const selectCurrentDay = createSelector(
  [selectCalendarMonth, selectWaterDate],
  (calendarMonth, waterDate) => {
    if (!calendarMonth) return "Today";

    const date = new Date(waterDate);
    const today = new Date();
    const formattedDate = date.toISOString().split("T")[0];
    const formattedToday = today.toISOString().split("T")[0];

    if (formattedDate === formattedToday) {
      return "Today";
    }

    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "long" });

    return `${day}, ${month}`;
  }
);

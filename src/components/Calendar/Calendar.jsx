import { useMemo } from "react";
import { useSelector } from "react-redux";
import CalendarItem from "../CalendarItem/CalendarItem";
import {
  selectMonthWater,
  selectCalendarMonth,
} from "../../redux/water/selectors";
import { calculateDaysInMonth } from "../../helpers/calculateDaysInMonth ";
import styles from "./Calendar.module.css";
import { selectDesiredVolume } from "../../redux/user/selectors";

const Calendar = () => {
  const monthWater = useSelector(selectMonthWater);
  const currentMonth = useSelector(selectCalendarMonth);
  const desiredVolume = useSelector(selectDesiredVolume);

  const daysInMonth = useMemo(
    () => calculateDaysInMonth(currentMonth),
    [currentMonth]
  );

  return (
    <ul className={styles.calendarList}>
      {daysInMonth.map((day) => {
        const currentDayDate = new Date(currentMonth);
        currentDayDate.setUTCDate(day);
        currentDayDate.setUTCHours(0, 0, 0, 0);
        const formattedDate = currentDayDate.toISOString().slice(0, 10);
        const dayData =
          monthWater.find((entry) => {
            return entry.date.slice(0, 10) === formattedDate;
          }) || null;
        const availability = dayData
          ? parseFloat(
              ((dayData.totalDayWater / (desiredVolume * 1000)) * 100).toFixed(
                2
              )
            )
          : 0;

        return (
          <li className={styles.calendarItem} key={formattedDate}>
            <CalendarItem
              availability={availability}
              day={day}
              currentDate={currentDayDate}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default Calendar;

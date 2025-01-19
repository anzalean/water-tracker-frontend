import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import CalendarItem from "../CalendarItem/CalendarItem";
import {
  selectMonthWater,
  selectCalendarMonth,
  selectWaterLoading,
} from "../../redux/water/selectors";
import { Loading } from "../Loading/Loading";
import { calculateDaysInMonth } from "../../helpers/calculateDaysInMonth ";
import styles from "./Calendar.module.css";
import { selectDesiredVolume } from "../../redux/user/selectors";

const Calendar = () => {
  const [activeDay, setActiveDay] = useState(null);
  const monthWater = useSelector(selectMonthWater);
  const currentMonth = useSelector(selectCalendarMonth);
  const isLoading = useSelector(selectWaterLoading);

  const desiredVolume = useSelector(selectDesiredVolume);

  const daysInMonth = useMemo(
    () => calculateDaysInMonth(currentMonth),
    [currentMonth]
  );

  if (isLoading)
    return (
      <div>
        <Loading customHeight="124" />
      </div>
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
        const isActive = formattedDate === activeDay;

        const handleSelect = () => {
          setActiveDay(formattedDate); // Устанавливаем активный день
        };

        return (
          <li className={styles.calendarItem} key={formattedDate}>
            <CalendarItem
              availability={availability}
              day={day}
              isActive={isActive}
              currentDate={currentDayDate}
              onSelect={handleSelect}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default Calendar;

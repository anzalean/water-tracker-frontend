import { useDispatch } from "react-redux";
import { setWaterDate, setCalendarMonth } from "../../redux/water/waterSlice";
import { useSelector } from "react-redux";
import { selectCalendarMonth } from "../../redux/water/selectors";
import styles from "./CalendarItem.module.css";
import { isToday } from "../../helpers/isToday";
import { isActiveDate } from "../../helpers/isActiveDate";
import { normalizeDate } from "../../helpers/normalizeDate";

const CalendarItem = ({ availability = 0, day, currentDate }) => {
  const dispatch = useDispatch();
  const calrndarDate = useSelector(selectCalendarMonth);
  const isActive = isActiveDate(currentDate, calrndarDate);

  const normalizedAvailability = Math.min(Math.round(availability), 100);
  const isFutureDate = normalizeDate(currentDate) > normalizeDate(new Date());

  const handleClick = () => {
    const date = new Date(currentDate);
    const dateISO = date.toISOString();
    dispatch(setWaterDate(dateISO));
    dispatch(setCalendarMonth(dateISO));
  };

  const buttonStyle = {
    backgroundColor: isActive
      ? "var(--color-darkblue)"
      : normalizedAvailability === 100
      ? "var(--color-white)"
      : "var(--color-darkblue-translucent)",

    color: isActive
      ? "var(--color-lightgreen)"
      : normalizedAvailability === 100
      ? "var(--color-black)"
      : "var(--color-black)",

    border: isToday(currentDate)
      ? "2px solid var(--color-border-today)"
      : "none",
  };

  return (
    <div className={styles.itemBox}>
      <button

        // data-tour="step-today"
        // data-tour={isToday(currentDate) ? "step-today" : undefined}
        onClick={handleClick}
        className={styles.buttonDay}
        style={buttonStyle}
        disabled={isFutureDate}
      >
        {day}
      </button>
      <span className={styles.infoText}>{normalizedAvailability}%</span>
    </div>
  );
};

export default CalendarItem;

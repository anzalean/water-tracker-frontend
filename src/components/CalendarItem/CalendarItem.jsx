import { useDispatch } from "react-redux";
import { setWaterDate, setCalendarMonth } from "../../redux/water/waterSlice";
import styles from "./CalendarItem.module.css";

const CalendarItem = ({
  availability = 0,
  day,
  isActive,
  currentDate,
  onSelect,
}) => {
  const dispatch = useDispatch();

  const normalizedAvailability = Math.min(availability, 100);

  const handleClick = () => {
    console.log("CurrentDate", currentDate);
    const date = new Date(currentDate);
    const dateISO = date.toISOString();
    dispatch(setWaterDate(dateISO));
    dispatch(setCalendarMonth(dateISO));
    onSelect(day);
  };

  const buttonStyle = {
    backgroundColor:
      normalizedAvailability === 100
        ? "var(--color-white)"
        : isActive
        ? "var(--color-darkblue)"
        : normalizedAvailability > 0
        ? "var(--color-darkblue-translucent)"
        : "var(--color-white)",
    color:
      normalizedAvailability === 100
        ? "var(--color-black)"
        : isActive
        ? "var(--color-lightgreen)"
        : "var(--color-black)",
  };

  return (
    <div className={styles.itemBox}>
      <button
        onClick={handleClick}
        className={styles.buttonDay}
        style={buttonStyle}
      >
        {day}
      </button>
      <span className={styles.infoText}>{normalizedAvailability}%</span>
    </div>
  );
};

export default CalendarItem;

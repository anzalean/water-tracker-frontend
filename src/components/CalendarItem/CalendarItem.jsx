import { useDispatch } from "react-redux";
import { setWaterDate, setCalendarMonth } from "../../redux/water/waterSlice";
import styles from "./CalendarItem.module.css";

const CalendarItem = ({ availability = 0, day, isActive, currentDate }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    console.log("CurrentDate", currentDate);
    const date = new Date(currentDate);
    const dateISO = date.toISOString();
    dispatch(setWaterDate(dateISO));
    dispatch(setCalendarMonth(dateISO));
  };

  const buttonStyle = {
    backgroundColor: isActive
      ? "var(--color-darkblue)"
      : availability < 100
      ? "var(--color-darkblue-translucent)"
      : "var(--color-white)",
    color: isActive ? "var(--color-lightgreen)" : "var(--color-black)",
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
      <span className={styles.infoText}>{availability}%</span>
    </div>
  );
};

export default CalendarItem;

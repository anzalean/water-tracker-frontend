import CalendarItem from "../CalendarItem/CalendarItem";
import styles from "./Calendar.module.css";

const Calendar = ({ month }) => {
  if (!Array.isArray(month) || month.length === 0) return null;
  return (
    <ul className={styles.calendarList}>
      {month.map((day) => {
        return <CalendarItem key={day} />;
      })}
    </ul>
  );
};

export default Calendar;

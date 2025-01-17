import { useEffect, useState } from "react";
import CalendarItem from "../CalendarItem/CalendarItem";
import styles from "./Calendar.module.css";

const Calendar = ({ currentMonth }) => {
  const [daysInMonth, setDaysInMonth] = useState([]);

  useEffect(() => {
    const calculateDaysInMonth = (date) => {
      const year = date.getFullYear();
      const month = date.getMonth();
      const days = new Date(year, month + 1, 0).getDate(); 
      return Array.from({ length: days }, (_, index) => index + 1); 
    };

    setDaysInMonth(calculateDaysInMonth(currentMonth));
  }, [currentMonth]);

  return (
    <ul className={styles.calendarList}>
      {daysInMonth.map((day) => {
        return (
          <li className={styles.calendarItem} key={day}>
            <CalendarItem day={day} />
          </li>
        );
      })}
    </ul>
  );
};

export default Calendar;

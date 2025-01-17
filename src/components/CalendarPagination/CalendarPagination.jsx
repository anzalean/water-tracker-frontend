import { useState } from "react";
import styles from "./CalendarPagination.module.css";
import sprite from "../../assets/icons/sprite.svg";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const CalendarPagination = ({ onMonthChange }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const updateDateAndFetchData = (newDate) => {
    setCurrentMonth(newDate);
    onMonthChange(newDate);
  };

  const navigateToPreviousMonth = () => {
    const updatedDate = new Date(currentMonth);
    updatedDate.setMonth(updatedDate.getMonth() - 1);
    updateDateAndFetchData(updatedDate);
  };

  const navigateToNextMonth = () => {
    const updatedDate = new Date(currentMonth);
    updatedDate.setMonth(updatedDate.getMonth() + 1);
    updateDateAndFetchData(updatedDate);
  };

  return (
    <div className={styles.container}>
      <button
        className={styles.buttonPrevious}
        type="button"
        onClick={navigateToPreviousMonth}
      >
        <svg className={styles.iconPrevious}>
          <use
            width={18}
            height={18}
            xlinkHref={`${sprite}#icon-chevron-left`}
          />
        </svg>
      </button>
      <span className={styles.text}>
        {monthNames[currentMonth.getMonth()]}, {currentMonth.getFullYear()}
      </span>
      <button
        className={styles.buttonNext}
        type="button"
        onClick={navigateToNextMonth}
      >
        <svg className={styles.iconNext}>
          <use
            width={18}
            height={18}
            xlinkHref={`${sprite}#icon-chevron-right`}
          />
        </svg>
      </button>
    </div>
  );
};

export default CalendarPagination;

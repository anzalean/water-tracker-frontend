import { useState } from "react";
import styles from "./CalendarPagination.module.css";
import sprite from "../../assets/icons/sprite.svg";
import { useTranslation } from "react-i18next";
import { isCurrentMonth } from "../../helpers/isCurrentMonth";

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
  const { t } = useTranslation();

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
    <div data-tour="step-month" className={styles.container}>
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
        {t(`ChooseDate.${monthNames[currentMonth.getMonth()].toLowerCase()}`)},
        {currentMonth.getFullYear()}
      </span>
      <button
        className={styles.buttonNext}
        type="button"
        onClick={navigateToNextMonth}
        disabled={isCurrentMonth(currentMonth)}
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

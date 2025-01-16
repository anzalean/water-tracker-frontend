import { useState } from "react";
import Calendar from "../Calendar/Calendar";
import CalendarPagination from "../CalendarPagination/CalendarPagination";
import styles from "./MonthInfo.module.css";
import sprite from "../../assets/icons/sprite.svg";

const MonthInfo = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const handleMonthChange = (newDate) => {
    setCurrentMonth(newDate);  
  };

  return (
    <div className={styles.monthInfoSection}>
      <div className={styles.monthPaginationBox}>
        <h3 className={styles.monthTitle}>Month</h3>
        <div className={styles.paginationWrapper}>
          <CalendarPagination onMonthChange={handleMonthChange}/>
          <button className={styles.iconStatistics}>
            <svg width={20} height={20}>
              <use xlinkHref={`${sprite}#icon-pie-chart-statistics`} />
            </svg>
          </button>
        </div>
      </div>
      <Calendar currentMonth={currentMonth}/>
    </div>
    );
};

export default MonthInfo;

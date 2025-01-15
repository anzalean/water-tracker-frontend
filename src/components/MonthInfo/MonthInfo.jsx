import Calendar from "../Calendar/Calendar";
import CalendarPagination from "../CalendarPagination/CalendarPagination";
import styles from "./MonthInfo.module.css";

const MonthInfo = () => {
  return (
    <div className={styles.monthInfoSection}>
      <div className={styles.monthPaginationBox}>
        <h3 className={styles.monthTitle}>Month</h3>
        <CalendarPagination />
      </div>
      <Calendar />
    </div>
  );
};

export default MonthInfo;
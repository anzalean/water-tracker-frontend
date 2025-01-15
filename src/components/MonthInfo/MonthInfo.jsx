import Calendar from "../Calendar/Calendar";
import styles from "./MonthInfo.module.css";

const MonthInfo = () => {
  return (
    <div className={styles.containerCalendar}>
      <Calendar />
    </div>
  );
};

export default MonthInfo;
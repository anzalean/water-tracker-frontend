import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Calendar from "../Calendar/Calendar";
import CalendarPagination from "../CalendarPagination/CalendarPagination";
import { selectCalendarMonth } from "../../redux/water/selectors";
import { getMonthWater } from "../../redux/water/waterOps";
import { errNotify, successNotify } from "../../helpers/notification";
import styles from "./MonthInfo.module.css";
import sprite from "../../assets/icons/sprite.svg";
import { setCalendarMonth } from "../../redux/water/waterSlice";

const MonthInfo = () => {
  const currentMonth = useSelector(selectCalendarMonth);
  const dispatch = useDispatch();

  const handleMonthChange = (newDate) => {
    dispatch(setCalendarMonth(new Date(newDate).toISOString()));
  };

  useEffect(() => {
    dispatch(getMonthWater(currentMonth))
      .unwrap()
      .then(() => {
        successNotify("Success to fetch month data.");
      })
      .catch((error) => {
        errNotify("Failed to fetch water month data.");
        console.error(error.message);
      });
  }, [dispatch, currentMonth]);

  return (
    <div data-tour="step-calendar" className={styles.monthInfoSection}>
      <div className={styles.monthPaginationBox}>
        <h3 className={styles.monthTitle}>Month</h3>
        <div className={styles.paginationWrapper}>
          <CalendarPagination onMonthChange={handleMonthChange} />
          <button className={styles.iconStatistics}>
            <svg width={20} height={20}>
              <use xlinkHref={`${sprite}#icon-pie-chart-statistics`} />
            </svg>
          </button>
        </div>
      </div>
      <Calendar currentMonth={currentMonth} />
    </div>
  );
};

export default MonthInfo;

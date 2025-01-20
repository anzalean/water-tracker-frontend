import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Calendar from "../Calendar/Calendar";
import CalendarPagination from "../CalendarPagination/CalendarPagination";
import { selectCalendarMonth } from "../../redux/water/selectors";
import { getMonthWater } from "../../redux/water/waterOps";
import { errNotify, successNotify } from "../../helpers/notification";
import styles from "./MonthInfo.module.css";
import sprite from "../../assets/icons/sprite.svg";
import { setCalendarMonth } from "../../redux/water/waterSlice";
import { Chart } from '../Chart/Chart';

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

  const [isActive, setIsActive] = useState(true); 
  const handleToggle = () => {
    setIsActive(!isActive);
  }
  return (
    <div data-tour="step-calendar" className={styles.monthInfoSection}>
      <div className={styles.monthPaginationBox}>
        {isActive ? <h3 className={styles.monthTitle}>Month</h3> : <h3 className={styles.monthTitle}>Statistics</h3>}
        <div className={styles.paginationWrapper}>
          <CalendarPagination onMonthChange={handleMonthChange} />
          <button className={styles.iconStatistics} onClick={handleToggle}>
            <svg width={20} height={20}>
              <use xlinkHref={`${sprite}#icon-pie-chart-statistics`} />
            </svg>
          </button>
        </div>
      </div>
      {isActive ? <Calendar currentMonth={currentMonth} /> : <Chart />}
    </div>
  );
};

export default MonthInfo;

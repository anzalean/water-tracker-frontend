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
import { Chart } from "../Chart/Chart";
import { useTranslation } from "react-i18next";

const MonthInfo = () => {
  const currentMonth = useSelector(selectCalendarMonth);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleMonthChange = (newDate) => {
    dispatch(setCalendarMonth(new Date(newDate).toISOString()));
  };

  useEffect(() => {
    dispatch(getMonthWater(currentMonth))
      .unwrap()
      .then(() => {
        successNotify(t("toast.fetchMonthDataSuccess"));
      })
      .catch((error) => {
        errNotify(t("toast.fetchMonthDataError"), { message: error.message });
      });
  }, [dispatch, currentMonth, t]);
  

  const [isActive, setIsActive] = useState(true);
  const handleToggle = () => {
    setIsActive(!isActive);
  };
  return (
    <div data-tour="step-calendar" className={styles.monthInfoSection}>
      <div className={styles.monthPaginationBox}>
        {isActive ? (
          <h3 className={styles.monthTitle}>{t("monthInfo.mouth")}</h3>
        ) : (
          <h3 className={styles.monthTitle}>{t("monthInfo.statistics")}</h3>
        )}
        <div className={styles.paginationWrapper}>
          <CalendarPagination onMonthChange={handleMonthChange} />
          <button
            data-tour="step-graphic"
            className={styles.iconStatistics} onClick={handleToggle}>
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

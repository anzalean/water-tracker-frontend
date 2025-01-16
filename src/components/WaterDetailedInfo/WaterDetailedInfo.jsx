import UserPanel from "../UserPanel/UserPanel";
import DailyInfo from "../DailyInfo/DailyInfo";
import MonthInfo from "../MonthInfo/MonthInfo"; 
import styles from "./WaterDetailedInfo.module.css";

const WaterDetailedInfo = () => {
  return (
    <section className={styles.waterDetailedInfo}>
      <UserPanel/>
      <DailyInfo /> 
      <MonthInfo/>
    </section>
  );
};

export default WaterDetailedInfo;
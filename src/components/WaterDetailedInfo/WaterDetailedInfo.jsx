{/* import DailyInfo from "../DailyInfo/DailyInfo"; */}
import MonthInfo from "../MonthInfo/MonthInfo"; 
import UserPanel from "../UserPanel/UserPanel";
import styles from "./WaterDetailedInfo.module.css";

const WaterDetailedInfo = () => {
  return (
    <section className={styles.waterDetailedInfo}>
      {/* <DailyInfo /> */}
      <UserPanel/>
      <MonthInfo/>

    </section>
  );
};

export default WaterDetailedInfo;
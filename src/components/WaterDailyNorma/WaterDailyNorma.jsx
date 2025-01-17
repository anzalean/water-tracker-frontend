import { useSelector } from "react-redux";
import styles from "./WaterDailyNorma.module.css";
import { selectDesiredVolume } from "../../redux/user/selectors";

const WaterDailyNorma = () => {
  const desiredVolume = useSelector(selectDesiredVolume);

  return (
    <div className={styles.dailyNormaContainer}>
      <span className={styles.dailyNormaAmount}>
        {desiredVolume ? `${(desiredVolume / 1000).toFixed(1)} L` : "—"}
      </span>
      <span className={styles.dailyNormaLabel}>My daily norma</span>
    </div>
  );
};

export default WaterDailyNorma;

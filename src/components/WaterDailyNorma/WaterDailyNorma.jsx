import { useSelector } from "react-redux";
import styles from "./WaterDailyNorma.module.css";
import { selectDesiredVolume } from "../../redux/user/selectors";

const WaterDailyNorma = () => {
  const desiredVolume = useSelector(selectDesiredVolume);

  return (
    <div data-tour="step-norma" className={styles.dailyNormaContainer} >
      <span className={styles.dailyNormaAmount}>
        {desiredVolume ? `${desiredVolume.toFixed(2)} L` : "—"}
      </span>
      <span className={styles.dailyNormaLabel}>My daily norma</span>
    </div>
  );
};

export default WaterDailyNorma;

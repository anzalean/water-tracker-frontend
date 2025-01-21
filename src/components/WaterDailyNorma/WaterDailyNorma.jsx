import { useSelector } from "react-redux";
import styles from "./WaterDailyNorma.module.css";
import { selectDesiredVolume } from "../../redux/user/selectors";
import { useTranslation } from "react-i18next";

const WaterDailyNorma = () => {
  const desiredVolume = useSelector(selectDesiredVolume);
  const { t } = useTranslation();

  return (
    <div data-tour="step-norma" className={styles.dailyNormaContainer}>
      <span className={styles.dailyNormaAmount}>
        {desiredVolume
          ? `${desiredVolume.toFixed(2)} ${t("waterMainInfo.l")}`
          : "—"}
      </span>
      <span className={styles.dailyNormaLabel}>{t("waterMainInfo.norma")}</span>
    </div>
  );
};

export default WaterDailyNorma;

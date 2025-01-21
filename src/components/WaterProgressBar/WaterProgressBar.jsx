import { useTranslation } from "react-i18next";
import iconsPath from "../../assets/icons/sprite.svg";
import styles from "./WaterProgressBar.module.css";

const WaterProgressBar = ({ progress }) => {
  const { t } = useTranslation();

  return (
    <div data-tour="step-progress" className={styles.progressBarContainer}>
      <div className={styles.progressBarTitle}>{t("waterMainInfo.today")}</div>
      <div className={styles.progressBarWrapper}>
        <div className={styles.progressBarTrack}>
          <div
            className={styles.progressBarFill}
            style={{ width: `${progress}%` }}
          ></div>
          <div
            className={styles.progressBarThumb}
            style={{ left: `${progress}%` }}
          >
            <svg className={styles.progressBarThumbIcon} width="12" height="12">
              <use href={`${iconsPath}#icon-ellipse-white`} />
            </svg>
            {progress !== 0 && progress !== 50 && progress !== 100 && (
              <div className={styles.currentProgress}>
                {Math.round(progress)}%
              </div>
            )}
          </div>
        </div>

        <div className={styles.progressBarLabels}>
          <span>0%</span>
          <span>50%</span>
          <span>100%</span>
        </div>
      </div>
    </div>
  );
};

export default WaterProgressBar;

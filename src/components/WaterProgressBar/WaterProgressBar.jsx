import iconsPath from "../../assets/icons/sprite.svg";
import styles from "./WaterProgressBar.module.css";

const WaterProgressBar = ({ progress }) => {
  return (
    <div className={styles.progressBarContainer}>
      <div className={styles.progressBarTitle}>Today</div>
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

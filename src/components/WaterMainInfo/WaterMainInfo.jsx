import React from 'react';
import WaterProgressBar from '../WaterProgressBar/WaterProgressBar';
import AddWaterButton from '../AddWaterButton/AddWaterButton';
import WaterDailyNorma from '../WaterDailyNorma/WaterDailyNorma';
import Logo from '../Logo/Logo'; // Импорт логотипа
import bottleImage from '../../assets/images/bottle_for_water@1x.webp';
import styles from './WaterMainInfo.module.css';

const WaterMainInfo = () => {
  const handleAddWater = () => {
    console.log('Add Water button clicked');
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.logoContainer}> {/* Контейнер для логотипа */}
        <Logo />
      </div>
      <div className={styles.dailyNormaContainer}>
  <span className={styles.dailyNormaAmount}>1.5 L</span>
  <span className={styles.dailyNormaLabel}>My daily norma</span>
      </div>

      <div className={styles.bottleContainer}>
      <img
        className={styles.bottleImage}
        src={bottleImage}
       alt="Water Bottle"
      />
      </div>
      <div className={styles.progressBarContainer}>
  <p className={styles.progressBarTitle}>Today</p>
  <div className={styles.progressBarTrack}>
    <div className={styles.progressBarFill}></div>
    <div className={styles.progressBarThumb}></div>
  </div>
</div>

      <div className={styles.buttonContainer}>
        <AddWaterButton onClick={handleAddWater} />
      </div>
    </div>
  );
};

export default WaterMainInfo;

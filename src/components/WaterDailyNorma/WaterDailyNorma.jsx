import React from 'react';
import styles from './WaterDailyNorma.module.css';

const WaterDailyNorma = ({ dailyNorm }) => {
  return (
    <div className={styles.container}>
      <span className={styles.amount}>{dailyNorm} L</span>
      <span className={styles.label}>My daily norma</span>
    </div>
  );
};

export default WaterDailyNorma;

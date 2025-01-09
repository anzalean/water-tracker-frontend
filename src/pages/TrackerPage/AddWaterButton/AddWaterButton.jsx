import React from 'react';
import styles from './AddWaterButton.module.css';

const AddWaterButton = ({ onClick }) => {
  return (
    <button className={styles.button} type="button" onClick={onClick}>
      <span className={styles.icon}>+</span>
      <span className={styles.text}>Add water</span>
    </button>
  );
};

export default AddWaterButton;

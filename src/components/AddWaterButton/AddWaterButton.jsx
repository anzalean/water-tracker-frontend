import React from 'react';
import styles from './AddWaterButton.module.css';

const AddWaterButton = ({ onClick }) => {
  return (
    <button className={styles.buttonContainer} onClick={onClick}>
      <svg
        className={styles.buttonIcon}
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8 3.33337V12.6667"
          className={styles.buttonPath}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M3.3335 8H12.6668"
          className={styles.buttonPath}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className={styles.buttonText}>Add water</span>
    </button>
  );
};

export default AddWaterButton;

export default AddWaterButton;

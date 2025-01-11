import React from 'react';
import styles from './AddWaterButton.module.css';

const AddWaterButton = ({ onClick }) => {
  return (
    <button className={styles.buttonContainer} onClick={onClick}>
      <svg className={styles.buttonIcon} >
        <use href="/src/assets/icons/sprite.svg#icon-plus"></use>
      </svg>
      <span className={styles.buttonText}>Add water</span>
    </button>
  );
};

export default AddWaterButton;

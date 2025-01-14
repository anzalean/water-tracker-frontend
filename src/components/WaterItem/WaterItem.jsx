import React from "react";
import styles from "./WaterItem.module.css";

const WaterItem = ({ volume, time, onEdit, onDelete }) => {
  return (
    <div className={styles.waterItem}>
      <div className={styles.iconWrapper}>
        <svg className={styles.icon} aria-hidden="true">
          <use href="/src/assets/icons/sprite.svg#icon-water-glass-green"></use>
        </svg>
      </div>
      <div className={styles.details}>
        <p className={styles.volume}>{volume} ml</p>
        <p className={styles.time}>{time}</p>
      </div>
      <div className={styles.actions}>
  <button
    className={styles.editButton}
    onClick={onEdit}
    aria-label="Edit"
  >
    <svg className={styles.actionIcon}>
      <use href="/src/assets/icons/sprite.svg#icon-edit"></use>
    </svg>
  </button>
  <button
    className={styles.deleteButton}
    onClick={onDelete}
    aria-label="Delete"
  >
    <svg className={styles.actionIcon}>
      <use href="/src/assets/icons/sprite.svg#icon-trash"></use>
    </svg>
  </button>
</div>

    </div>
  );
};

export default WaterItem;

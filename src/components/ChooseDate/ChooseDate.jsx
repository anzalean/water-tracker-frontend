import React from "react";
import styles from "./ChooseDate.module.css";

const ChooseDate = ({ date, onChange }) => {
  const handleDateChange = (event) => {
    const newDate = new Date(event.target.value);
    onChange(newDate);
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Today</h3>
    </div>
  );
};

export default ChooseDate;

import styles from "./CalendarItem.module.css";

const CalendarItem = ({ availability = 0, day, isActive }) => {
  console.log(availability);
  console.log(isActive);
  const buttonStyle = {
    backgroundColor: isActive
      ? "var(--color-darkblue)"
      : availability < 100
      ? "var(--color-darkblue-translucent)"
      : "var(--color-white)",
    color: isActive ? "var(--color-lightgreen)" : "var(--color-black)",
  };

  return (
    <div className={styles.itemBox}>
      <button className={styles.buttonDay} style={buttonStyle}>
        {day}
      </button>
      <span className={styles.infoText}>{availability}%</span>
    </div>
  );
};

export default CalendarItem;

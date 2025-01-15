import styles from "./ChooseDate.module.css";

const ChooseDate = ({ date }) => {
  const isToday = new Date().toDateString() === date.toDateString();

  return (
    <div className={styles.chooseDate}>
      <span className={styles.dateText}>
        {isToday ? "Today" : date.toLocaleDateString("en-US", { day: "numeric", month: "short" })}
      </span>
    </div>
  );
};

export default ChooseDate;


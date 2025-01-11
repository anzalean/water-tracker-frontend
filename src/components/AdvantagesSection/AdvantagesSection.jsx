import css from "./AdvantagesSection.module.css";
import Customers from "../Customers/Customers.jsx";

const AdvantagesSection = () => {
  return (
    <div className={css.advantagesSection}>
      <div className={css.userCount}>
        <Customers />
      </div>

      <div className={css.advantagesGroupHabits}>
        <ul className={css.advantagesList}>
          <li className={css.advantagesHabit}>
            <div className={css.ellipse}></div>
            <p className={css.habit_1}>Habit drive</p>
          </li>
          <li className={css.advantagesHabit}>
            <p className={css.habit_2}>View Statistics</p>
          </li>
          <li className={css.advantagesHabit}>
            <p className={css.habit_3}>Personal rate setting</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdvantagesSection;
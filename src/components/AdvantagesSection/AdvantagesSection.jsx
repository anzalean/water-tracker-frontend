import css from "./AdvantagesSection.module.css";
import UserCount from "./UserCount.jsx";

const AdvantagesSection = () => {
  
  return (
    <div className={css.advantagesSection}>
      <div className={css.userCount}>
        <UserCount />
      </div>
      

      <ul className={css.advantagesList}>
        <li className={css.advantagesHabit}>Habit drive</li>
        <li className={css.advantagesStatistics}>View Statistics</li>
        <li className={css.advantagesSetting}>Personal rate setting</li>
      </ul>
    </div>
  );
};

export default AdvantagesSection;
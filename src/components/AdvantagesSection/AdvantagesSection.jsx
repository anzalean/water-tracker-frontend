import css from "./AdvantagesSection.module.css";
import React from "react";

const AdvantagesSection = () => {
  
  return (
    <div className={css.advantagesSection}>
      

      <ul className={css.advantagesList}>
        <li className={css.advantagesHabit}>habitDrive</li>
        <li className={css.advantagesStatistics}>viewStats</li>
        <li className={css.advantagesSetting}>personalRate</li>
      </ul>
    </div>
  );
};

export default AdvantagesSection;
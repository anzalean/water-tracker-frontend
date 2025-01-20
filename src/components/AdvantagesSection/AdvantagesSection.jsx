import css from "./AdvantagesSection.module.css";
import Customers from "../Customers/Customers.jsx";
import { useTranslation } from "react-i18next";

const AdvantagesSection = () => {
  const { t } = useTranslation();
  return (
    <div className={css.advantagesSection}>
      <div className={css.userCount}>
        <Customers />
      </div>

      <div className={css.advantagesGroupHabits}>
        <ul className={css.advantagesList}>
          <li className={css.advantagesHabit}>
            <div className={css.ellipse}></div>
            <p className={css.habit_1}>{t("advantagesSection.habit")}</p>
          </li>
          <li className={css.advantagesHabit}>
            <p className={css.habit_2}>{t("advantagesSection.statistics")}</p>
          </li>
          <li className={css.advantagesHabit}>
            <p className={css.habit_3}>{t("advantagesSection.setting")}</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdvantagesSection;

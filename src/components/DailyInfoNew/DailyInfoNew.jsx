import { useSelector } from "react-redux";
import { selectCurrentDay } from "../../redux/water/selectors";
import WaterCardList from "../WarterCardList/WaterCardList";
import CreateWaterBtn from "../CreateWaterBtn/CreateWarterBtn";
import css from "./DailyInfoNew.module.css";
import { useTranslation } from "react-i18next";

const DailyInfoNew = () => {
  const currentDay = useSelector(selectCurrentDay);
  const { t } = useTranslation();
  const [day, month] = currentDay?.split(" ") || [];
  const translatedMonth = month ? t(`ChooseDate.${month.toLowerCase()}`) : "";

  const displayDay =
    currentDay === "Today"
      ? t("ChooseDate.today")
      : currentDay && day && translatedMonth
      ? `${day} ${translatedMonth}`
      : "";

  return (
    <div data-tour="step-info" className={css.container}>
      <div className={css.dayContainer}>
        <p className={css.day}>{displayDay}</p>
        <div>
          <CreateWaterBtn />
        </div>
      </div>
      <WaterCardList />
    </div>
  );
};

export default DailyInfoNew;

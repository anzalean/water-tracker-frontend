import css from "./WaterDetailedInfoNew.module.css";
import DailyInfoNew from "../../components/DailyInfoNew/DailyInfoNew";
import MonthInfo from "../MonthInfo/MonthInfo";
import UserPanel from "../../components/UserPanel/UserPanel";

const WaterDetailedInfo = () => {
  return (
    <div className={css.section}>
      <div className={css.container}>
        <UserPanel />
        <DailyInfoNew />
        <MonthInfo />
      </div>
    </div>
  );
};

export default WaterDetailedInfo;

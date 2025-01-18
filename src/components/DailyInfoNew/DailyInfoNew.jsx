// import { useSelector } from "react-redux";
// import { selectCurrentDay } from "../../redux/water/selectors";
import WaterCardList from "../WarterCardList/WaterCardList.jsx";
import CreateWaterBtn from "../CreateWaterBtn/CreateWarterBtn.jsx";
import css from "./DailyInfoNew.module.css";

const currentDay = "Today";

const DailyInfoNew = () => {
  // const currentDay = useSelector(selectCurrentDay);
  return (
    <div className={css.container}>
      <div className={css.dayContainer}>
        <p className={css.day}>{currentDay}</p>
        <div>
          <CreateWaterBtn />
        </div>
      </div>
      <WaterCardList />
    </div>
  );
};

export default DailyInfoNew;

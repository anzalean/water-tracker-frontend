// import { useSelector } from "react-redux";
// import { selectCurrentDay } from "../../redux/water/selectors";
import WaterCardList from "../WarterCardList/WaterCardList.jsx";
import AddWaterBtn from "../AddWaterbtn/AddWaterbtn.jsx";
import css from "./DailyInfoNew.module.css";

const currentDay = "ToDay";

const DailyInfoNew = () => {
  // const currentDay = useSelector(selectCurrentDay);
  return (
    <div className={css.container}>
      <div className={css.dayContainer}>
        <p className={css.day}>{currentDay}</p>
        <AddWaterBtn />
      </div>
      <WaterCardList />
    </div>
  );
};

export default DailyInfoNew;

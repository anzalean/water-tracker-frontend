// import { useSelector } from "react-redux";
// import { selectCurrentDay } from "../../redux/water/selectors";
import WaterList from "../../components/WarterList/WaterList.jsx";
import AddWaterBtn from "../AddWaterbtn/AddWaterbtn.jsx";
import css from "./DailyInfo.module.css";

const currentDay = "ToDay";

const DailyInfo = () => {
  // const currentDay = useSelector(selectCurrentDay);
  return (
    <div className={css.container}>
      <div className={css.dayContainer}>
        <p className={css.day}>{currentDay}</p>
        <AddWaterBtn />
      </div>
      <WaterList />
    </div>
  );
};

export default DailyInfo;

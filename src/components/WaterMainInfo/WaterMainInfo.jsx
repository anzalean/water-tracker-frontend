import WaterProgressBar from "../WaterProgressBar/WaterProgressBar";
import AddWaterButton from "../AddWaterButton/AddWaterButton";
import WaterDailyNorma from "../WaterDailyNorma/WaterDailyNorma";
import Logo from "../Logo/Logo";
import bottleImage from "../../assets/images/bottle_for_water@1x.webp";
import styles from "./WaterMainInfo.module.css";
import { useSelector } from "react-redux";
import { selectTotalDayWater } from "../../redux/water/selectors";
import { selectDesiredVolume } from "../../redux/user/selectors";

const WaterMainInfo = ({ onAddWater }) => {
  const desiredVolume = useSelector(selectDesiredVolume);
  const totalDayWater = useSelector(selectTotalDayWater);
  const progress = desiredVolume
    ? (totalDayWater / (desiredVolume * 1000)) * 100
    : 0;

  return (
    <div className={styles.mainContainer}>
      <Logo />
      <WaterDailyNorma amount="1.5 L" label="My daily norma" />

      <div className={styles.bottleContainer}>
        <img
          className={styles.bottleImage}
          src={bottleImage}
          alt="Water Bottle"
        />
      </div>

      <WaterProgressBar progress={progress} />

      <div className={styles.buttonContainer}>
        <AddWaterButton onClick={onAddWater} />
      </div>
    </div>
  );
};

export default WaterMainInfo;

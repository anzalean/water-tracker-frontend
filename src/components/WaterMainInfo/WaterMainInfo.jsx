import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import WaterProgressBar from "../WaterProgressBar/WaterProgressBar";
import AddWaterButton from "../AddWaterButton/AddWaterButton";
import WaterDailyNorma from "../WaterDailyNorma/WaterDailyNorma";
import { selectWaterProgress } from "../../redux/water/selectors";
import Logo from "../Logo/Logo";
import bottleImage from "../../assets/images/bottle_for_water@1x.webp";
import styles from "./WaterMainInfo.module.css";

const WaterMainInfo = () => {
  const progress = useSelector(selectWaterProgress);
  const [previousProgress, setPreviousProgress] = useState(progress || 0);
  const [displayedProgress, setDisplayedProgress] = useState(progress || 0);

  useEffect(() => {
    if (progress === undefined || progress === null) {
      setDisplayedProgress(previousProgress);
    } else {
      if (progress !== previousProgress) {
        setPreviousProgress(progress);
        setDisplayedProgress(progress);
      }
    }
  }, [progress, previousProgress]);

  return (

    <div className={styles.mainContainer + " tour-start"}>
      <Logo />
      <WaterDailyNorma amount="1.5 L" label="My daily norma" />

      <div className={styles.bottleContainer}>
        <img
          className={styles.bottleImage}
          src={bottleImage}
          alt="Water Bottle"
        />
      </div>

      <WaterProgressBar
        progress={displayedProgress}
        className="step-3-progress"
      />

      <div className={styles.buttonContainer}>
        <AddWaterButton />
      </div>
    </div>
  );
};

export default WaterMainInfo;

import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Page } from "../../components/Page/Page";
import WaterMainInfo from "../../components/WaterMainInfo/WaterMainInfo";
import WaterDetailedInfo from "../../components/WaterDetailedInfo/WaterDetailedInfo";
import css from "./TrackerPage.module.css";
import TourButton from "../../components/TourButton/TourButton";

export default function TrackerPage() {

  useEffect(() => {
    const questionIcon = document.querySelector(`.${css.question}`);

    const addShakeAnimation = () => {
      if (questionIcon) {
        questionIcon.classList.add(css.shake);
        setTimeout(() => {
          questionIcon.classList.remove(css.shake);
        }, 1000); // Довжина анімації (1 секунда)
      }
    };

    const intervalId = setInterval(addShakeAnimation, 6000); // Запуск кожну хвилину

    return () => clearInterval(intervalId); // Очищення інтервалу при розмонтуванні
  }, []);

  return (
    <React.Fragment>
      <Helmet>
        <title>Tracker</title>
      </Helmet>
      <Page>
        <div className={css.trackerPage}>
          <WaterMainInfo />
          <WaterDetailedInfo />
            <TourButton/>
        </div>
      </Page>
    </React.Fragment>
  );
}


import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Page } from "../../components/Page/Page";
import WaterMainInfo from "../../components/WaterMainInfo/WaterMainInfo";
import WaterDetailedInfo from "../../components/WaterDetailedInfo/WaterDetailedInfo";
import css from "./TrackerPage.module.css";
import { useTour } from "@reactour/tour";
import steps from "../../helpers/steps";
import iconsPath from "../../assets/icons/sprite.svg";

export default function TrackerPage() {
  const { setIsOpen, isOpen } = useTour();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  const startTour = () => {
    const firstStepSelector = steps[0].selector;
    const waitForSteps = setInterval(() => {
      const stepElement = document.querySelector(firstStepSelector);
      if (stepElement) {
        clearInterval(waitForSteps);
        setIsOpen(true);
      }
    }, 200);
  };

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
          <button
            data-tour="step-start"
            className={css.helpButton}
            onClick={startTour}
          >
            <svg className={css.question} width="20" height="20">
              <use href={`${iconsPath}#icon-question`} />
            </svg>
          </button>
        </div>
      </Page>
    </React.Fragment>
  );
}


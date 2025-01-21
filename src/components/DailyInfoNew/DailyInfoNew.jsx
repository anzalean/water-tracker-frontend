// import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectCurrentDay } from "../../redux/water/selectors";
import WaterCardList from "../WarterCardList/WaterCardList";
import CreateWaterBtn from "../CreateWaterBtn/CreateWarterBtn";
import css from "./DailyInfoNew.module.css";
import { useTranslation } from "react-i18next";
// import { useTour } from "@reactour/tour";

const DailyInfoNew = () => {
  const currentDay = useSelector(selectCurrentDay);
  // const waterCards = useSelector((state) => selectWaterItems(state).filter(card => card.date === currentDay));
  const { t } = useTranslation();
  // const { currentStep, steps, setCurrentStep } = useTour();
  // const [isWaterCardExist, setIsWaterCardExist] = useState(false);

  // const [isTourActive, setIsTourActive] = useState(false);
  
  // useEffect(() => {
  //   if (steps[currentStep]?.selector === '[data-tour="step-info"]') {
  //     setIsTourActive(true);
  //   } else if (
  //     steps[currentStep]?.selector === '[data-tour="step-portion"]' ||
  //     steps[currentStep]?.selector === '[data-tour="step-edit-card"]' ||
  //     steps[currentStep]?.selector === '[data-tour="step-delete-card"]'
  //   ) {
  //     if (waterCards.length > 0) {
  //       setIsTourActive(true);
  //     } else {
  //       // Якщо waterCard не існує, переключаємо крок на step-calendar 
  //       setCurrentStep(steps.findIndex(step => step.selector === '[data-tour="step-calendar"]'));
  //     }
  //   // } else if (steps[currentStep]?.selector === '[data-tour="step-calendar"]') {
  //   //   // Якщо переходимо назад з step-calendar, перевіряємо наявність waterCards 
  //   //   if (waterCards.length === 0 && currentStep > 0) {
  //   //   // Якщо waterCards немає, пропускаємо кроки і переходимо до step-info 
  //   //     setCurrentStep(steps.findIndex(step => step.selector === '[data-tour="step-info"]'));
  //   //   }
  //   } else {
  //     setIsTourActive(false);
  //   }
  // }, [currentStep, steps, waterCards.length, setCurrentStep]);

  // useEffect(() => {
  //   dispatch(fetchWaterItems());
  // // Завантаження даних при завантаженні компонента 
  // }, [dispatch]);
  
  // useEffect(() => {
  //   if (steps[currentStep]?.selector === '[data-tour="step-info"]') {
  //     setIsTourActive(true);
  //   } else if (
  //     steps[currentStep]?.selector === '[data-tour="step-portion"]' ||
  //     steps[currentStep]?.selector === '[data-tour="step-edit-card"]' ||
  //     steps[currentStep]?.selector === '[data-tour="step-delete-card"]'
  //   ) {
  //     if (waterCards.length > 0) {
  //     console.log('waterCards length:', waterCards.length);
  //       setIsTourActive(true);
  //     } else {
  //       // Якщо waterCard не існує, переключаємо крок на step-calendar
  //       //   setCurrentStep(steps.findIndex(step => step.selector === '[data-tour="step-calendar"'));
  //       setCurrentStep((prevStep) => {
  //         const nextStep = steps.findIndex(
  //           (step, index) => index > prevStep &&
  //             step.selector !== '[data-tour="step-portion"]' &&
  //             step.selector !== '[data-tour="step-edit-card"]' &&
  //             step.selector !== '[data-tour="step-delete-card"]');
  //         return nextStep !== -1 ? nextStep : steps.length - 1;
  //       });
  //     }
      
  //   } else {
  //     setIsTourActive(false);
  //   }
  // }, [currentStep, steps, waterCards.length, setCurrentStep]);

  // useEffect(() => {
  //   if (steps[currentStep]?.selector === '[data-tour="step-info"]') {
  //     setIsTourActive(true);
  //   } else {
  //     setIsTourActive(false);
  //   }
  // }, [currentStep, steps]);
  
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
      <WaterCardList
        // isTourActive={isTourActive}
      />
    </div>
  );
};

export default DailyInfoNew;

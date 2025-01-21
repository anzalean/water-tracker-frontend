// import { useEffect } from "react";
// import { useTour } from '@reactour/tour';
// import css from './TourButton.module.css';
// import iconsPath from "../../assets/icons/sprite.svg";
// import steps from "../../helpers/steps";

// const TourButton = () => {
//     const { setCurrentStep, setIsOpen, isOpen } = useTour();

//     useEffect(() => {
//     if (isOpen) {
//         document.body.style.overflow = "hidden";
//     } else {
//         document.body.style.overflow = "unset";
//     }
//     }, [isOpen]);

//     const startTour = () => {
//         setCurrentStep(0);
//         const firstStepSelector = steps[0].selector;
//         const waitForSteps = setInterval(() => {
//         const stepElement = document.querySelector(firstStepSelector);
//         if (stepElement) {
//         clearInterval(waitForSteps);
//         setIsOpen(true);
//         }
//     }, 200);
//     };
    

//     return (
//         <button
//             data-tour="step-start"
//             className={css.tourButton}
//             onClick={startTour}>
//                 <svg className={css.question} width="20" height="20">
//                     <use href={`${iconsPath}#icon-question`} />
//                 </svg>
//         </button>
//     );
// };

// export default TourButton;

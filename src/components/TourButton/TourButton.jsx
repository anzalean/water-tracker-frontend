import { useEffect } from "react";
import iconsPath from "../../assets/icons/sprite.svg";
import css from "./TourButton.module.css";
import steps from "../../helpers/steps";
import { useTour } from '@reactour/tour';

const TourButton = () => {
    const { setCurrentStep, setIsOpen, isOpen } = useTour();

    useEffect(() => {
        if (isOpen) {
        document.body.style.overflow = "hidden";
        } else {
        document.body.style.overflow = "unset";
        }
    }, [isOpen]);

    const startTour = () => {
        setCurrentStep(0);
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

        const intervalId = setInterval(addShakeAnimation, 6000); // Запуск кожні 6 секунд

        return () => clearInterval(intervalId); // Очищення інтервалу при розмонтуванні
    }, []);

    return (
        <button
        data-tour="step-start"
        className={css.tourButton}
        onClick={startTour}
        >
        <svg className={css.question} width="20" height="20">
            <use href={`${iconsPath}#icon-question`} />
        </svg>
        </button>
    );
};

export default TourButton;

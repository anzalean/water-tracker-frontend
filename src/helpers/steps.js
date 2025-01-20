const steps = [
    {
        selector: ".tour-start",
        content: "Натисніть тут, щоб почати ваш перший тур.",
    },
    {
        selector: '[data-tour="step-home"]',
        content: "Click to back home.",
    },
    {
        selector: '[data-tour="step-norma"]',
        content: "Your daily water norma.",
    },
    {
        selector: '[data-tour="step-progress"]',
        content: "Your's today progress.",
    },
    {
        selector: '[data-tour="step-add-card"]',
        content: "Add your water card.",
    },
    {
        selector: '[data-tour="step-profile"]',
        content: "Edit your profile.",
    },
    {
        selector: '[data-tour="step-info"]',
        content: "Your daily info.",
    },
    {
        selector: '[data-tour="step-calendar"]',
        content: "Your calendar.",
    },
];

// steps.forEach((step) => {
//   if (!document.querySelector(step.selector)) {
//     console.error(`Element ${step.selector} not found`);
//   }
// });

export default steps;
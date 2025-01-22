import i18n from 'i18next';

const steps = [
    {
        selector: '[data-tour="step-start"]',
        content: () => i18n.t('tour.stepStart'),
    },
    {
        selector: '[data-tour="step-home"]',
        content: () => i18n.t('tour.stepHome'),
    },
    {
        selector: '[data-tour="step-language"]',
        content: () => i18n.t('tour.stepLanguage'),
    },
    {
        selector: '[data-tour="step-norma"]',
        content: () => i18n.t('tour.stepNorma'),
    },
    {
        selector: '[data-tour="step-progress"]',
        content: () => i18n.t('tour.stepProgress'),
    },
    {
        selector: '[data-tour="step-add-card"]',
        content: () => i18n.t('tour.stepAddCard'),
    },
    {
        selector: '[data-tour="step-profile"]',
        content: () => i18n.t('tour.stepProfile'),
    },
    {
        selector: '[data-tour="step-settings"]',
        content: () => i18n.t('tour.stepSettings'),
    },
    {
        selector: '[data-tour="step-logout"]',
        content: () => i18n.t('tour.stepLogout'),
    },
    {
        selector: '[data-tour="step-info"]',
        content: () => i18n.t('tour.stepInfo'),
    },
    {
        selector: '[data-tour="step-calendar"]',
        content: () => i18n.t('tour.stepCalendar'),
    },
    {
        selector: '[data-tour="step-month"]',
        content: () => i18n.t('tour.stepMonth'),
    },
    {
        selector: '[data-tour="step-graphic"]',
        content: () => i18n.t('tour.stepGraphic'),
    },
];

export default steps;

// src/components/WelcomeSection/WelcomeSection.jsx

import { useNavigate } from "react-router-dom";
import css from "./WelcomeSection.module.css";
// import { Container } from "../Container/Container";
import Logo from "../Logo/Logo";
import { useTranslation } from "react-i18next";

export const WelcomeSection = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleTryTrackerClick = () => {
    navigate("/signup");
  };

  const handleSignInClick = () => {
    navigate("/signin");
  };

  return (
    <div className={css.WelcomeSectionContainer}>
      <div className={css.logoWrapper}>
        <Logo />
      </div>
      <div className={css.wrapper}>
        <p className={css.subtitle}>{t("welcomeSection.mainText")}</p>
        <h1 className={css.title}>{t("welcomeSection.title")}</h1>
        <div className={css.buttonsWrapper}>
          <button className={css.tryTracker} onClick={handleTryTrackerClick}>
            {t("welcomeSection.tryTracker")}
          </button>
          <button className={css.signIn} onClick={handleSignInClick}>
            {t("welcomeSection.signIn")}
          </button>
        </div>
      </div>
    </div>
  );
};

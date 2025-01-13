// src/components/WelcomeSection/WelcomeSection.jsx

import { useNavigate } from "react-router-dom";
import css from "./WelcomeSection.module.css";
// import { Container } from "../Container/Container";
import Logo from "../Logo/Logo";

export const WelcomeSection = () => {
  const navigate = useNavigate();

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
        <p className={css.subtitle}>Record daily water intake and track</p>
        <h1 className={css.title}>Water consumption tracker</h1>
        <div className={css.buttonsWrapper}>
          <button className={css.tryTracker} onClick={handleTryTrackerClick}>
            Try tracker
          </button>
          <button className={css.signIn} onClick={handleSignInClick}>
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

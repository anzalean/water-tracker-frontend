// src/components/Logo/Logo.jsx
import { useTranslation } from "react-i18next";
import styles from "./Logo.module.css";

const Logo = () => {
  const { t } = useTranslation();
  return (
    <a href="/" data-tour="step-home" className={styles.logo}>
      {t("logo.logo")}
    </a>
  );
};

export default Logo;

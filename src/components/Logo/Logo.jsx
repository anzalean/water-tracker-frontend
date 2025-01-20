// src/components/Logo/Logo.jsx

import styles from "./Logo.module.css";

const Logo = () => {
  return (
    <a href="/" data-tour="step-home" className={styles.logo}>
      AQUATRACK
    </a>
  );
};

export default Logo;

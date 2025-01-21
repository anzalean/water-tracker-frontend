import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import iconsPath from "../../assets/icons/sprite.svg";
import style from "./Languages.module.css";

export default function Languages() {
  const { i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const containerRef = useRef(null);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsMenuOpen(false); // Закриваємо меню після вибору мови
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      data-tour="step-language"
      className={style.container}
      ref={containerRef}
    >
      <div className={style.globe} onClick={toggleMenu}>
        {/* SVG глобуса */}
        <svg className={style.globe} width="20" height="20">
                  <use href={`${iconsPath}#icon-world`} />
                </svg>
      </div>

      {isMenuOpen && (
        <div className={style.menu}>
          <button
            className={style.languageBtn}
            onClick={() => changeLanguage("en")}
          >
            EN
          </button>
          <button
            className={style.languageBtn}
            onClick={() => changeLanguage("uk")}
          >
            UK
          </button>
        </div>
      )}
    </div>
  );
};



import { useTranslation } from "react-i18next";
import style from "./Languages.module.css";

const Languages = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  return (
    <>
      <header
        data-aos="zoom-in"
        data-aos-easing="ease-in-back"
        data-aos-delay="300"
        data-aos-offset="0"
        className={style.languages}
      >
        <button
          className={style.languageBtn}
          onClick={() => changeLanguage("en")}
        >
          EN
        </button>
        <span className={style.line}>|</span>
        <button
          className={style.languageBtn}
          onClick={() => changeLanguage("uk")}
        >
          UK
        </button>
      </header>
    </>
  );
};

export default Languages;

import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

import uk from "./languages/uk.json";
import en from "./languages/en.json";

i18n
  .use(Backend) // Использование метода use для добавления плагина Backend
  .use(initReactI18next) // Подключение React плагина
  .use(LanguageDetector) // Автоопределение языка
  .init({
    fallbackLng: "en", // Язык по умолчанию
    debug: false, // Отключить отладку
    resources: {
      en: {
        translation: en,
      },
      uk: {
        translation: uk,
      },
    },
    ns: ["translation"], // Пространство имен
    defaultNS: "translation", // Пространство имен по умолчанию
  });

export default i18n;

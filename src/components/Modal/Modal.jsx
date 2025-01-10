import { useEffect } from "react";
import css from "./Modal.module.css";
import sprite from "../../assets/icons/sprite.svg";

export const Modal = ({ children, onClose }) => {
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div onClick={handleBackdropClick} className={css.wrapper}>
      <div className={css.modalContent}>
        <button onClick={onClose} className={css.closeBtn}>
          <svg className={css.iconClose}>
            <use
              href={`${sprite}#icon-close`}
            ></use>
          </svg>
        </button>
        {children}
      </div>
    </div>
  );
};


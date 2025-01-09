import { useEffect } from "react";
import css from "./Modal.module.css";

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
          ×
        </button>
        {children}
      </div>
    </div>
  );
};

// export default Modal;

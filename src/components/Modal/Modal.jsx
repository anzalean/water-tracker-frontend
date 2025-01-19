import { useRef, useEffect, useCallback } from "react";
import clsx from "clsx";
import ReactDOM from "react-dom";
import iconsPath from "../../assets/icons/sprite.svg";
import css from "./Modal.module.css";

const Modal = ({
  children,
  onClose,
  portalId = "portal-root",
  isUserForm = null,
}) => {
  const wrapperRef = useRef(null);

  const handleClickOutside = useCallback(
    (event) => {
      event.stopPropagation();
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        onClose();
      }
    },
    [onClose]
  );

  const handleDocumentKeyDown = useCallback(
    (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleDocumentKeyDown);
    
    return () => {
      document.removeEventListener("keydown", handleDocumentKeyDown);

    };
  }, [handleDocumentKeyDown]);

  return ReactDOM.createPortal(
    <div className={css.modalWrapper} onClick={handleClickOutside}>
      <div
        className={clsx(css.modal, isUserForm && css.userModal)}
        ref={wrapperRef}
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <button
          className={clsx(css.closeBtn, isUserForm && css.closeBtnUserForm)}
          onClick={onClose}
        >
          <svg className={css.icon} aria-label="close button icon">
            <use href={`${iconsPath}#icon-close`} />
          </svg>
        </button>
        <div className={css.modalContent}>{children}</div>
      </div>
    </div>,
    document.getElementById(portalId)
  );
};

export default Modal;

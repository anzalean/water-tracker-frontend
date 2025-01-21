import React from "react";
import { useForm } from "react-hook-form";
import clsx from "clsx";
import css from "./LogoutApprove.module.css";
import { useTranslation } from "react-i18next";

const LogoutApprove = ({ onCancel, onApprove }) => {
  const { handleSubmit } = useForm();
  const { t } = useTranslation();

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit(onApprove)}>
        <div className={css.form}>
          <div className={css.titleWrapper}>
            <p className={css.title}>{t("modals.logOut.title")}</p>
            <p className={css.subTitle}>{t("modals.logOut.text")}</p>
          </div>
          <div className={css.buttons}>
            <button type="submit" className={clsx(css.btn, css.primary)}>
              {t("modals.logOut.logOut")}
            </button>

            <button
              onClick={onCancel}
              type="button"
              className={clsx(css.btn, css.secondary)}
            >
              {t("modals.logOut.cancel")}
            </button>
          </div>
        </div>
      </form>
    </React.Fragment>
  );
};

export default LogoutApprove;

import React from "react";
import { useForm } from "react-hook-form";
import clsx from "clsx";
import css from "./LogoutApprove.module.css";

const LogoutApprove = ({ onCancel, onApprove }) => {
  const { handleSubmit } = useForm();

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit(onApprove)}>
        <div className={css.form}>
          <div className={css.titleWrapper}>
            <p className={css.title}>Log out</p>
            <p className={css.subTitle}>Do you really want to leave?</p>
          </div>
          <div className={css.buttons}>
            <button type="submit" className={clsx(css.btn, css.primary)}>
              Log out
            </button>

            <button
              onClick={onCancel}
              type="button"
              className={clsx(css.btn, css.secondary)}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </React.Fragment>
  );
};

export default LogoutApprove;

import React from "react";
import { useForm } from "react-hook-form";
import css from "./DeleteWaterApprove.module.css";

export const DeleteWaterApprove = ({ onCancel, onApprove }) => {
  const { handleSubmit } = useForm();

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit(onApprove)}>
        <div className={css.deleteWaterContent}>
          <div className={css.deleteTitleGroup}>
            <h2 className={css.deleteWaterTitle}>Delete Entry</h2>
            <p className={css.deleteWaterCaption}>
              Are you sure you want to delete this entry?
            </p>
          </div>
          <div className={css.deleteBtnCont}>
            <button className={css.deleteButton} onClick={onApprove}>
              Delete
            </button>
            <button className={css.cancelButton} onClick={onCancel}>
              Cancel
            </button>
          </div>
        </div>
      </form>
    </React.Fragment>
  );
};

import { useForm } from "react-hook-form";
import css from "./DeleteWaterApprove.module.css";

export const DeleteWaterApprove = ({ onCancel, onApprove }) => {
  const { handleSubmit } = useForm();

  return (
    <>
      <form onSubmit={handleSubmit(onApprove)}>
        <div className={css.deleteWaterContent}>
          <div className={css.deleteTitleGroup}>
            <h2 className={css.deleteWaterTitle}>Delete Entry</h2>
            <p className={css.deleteWaterCaption}>
              Are you sure you want to delete this entry?
            </p>
          </div>
          <div className={css.deleteBtnCont}>
            <button type="submit" className={css.deleteButton}>
              Delete
            </button>
            <button
              type="button"
              className={css.cancelButton}
              onClick={(event) => {
                event.preventDefault();
                onCancel();
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

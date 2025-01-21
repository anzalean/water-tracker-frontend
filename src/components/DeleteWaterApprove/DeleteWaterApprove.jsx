import { useForm } from "react-hook-form";
import css from "./DeleteWaterApprove.module.css";
import { useTranslation } from "react-i18next";

export const DeleteWaterApprove = ({ onCancel, onApprove }) => {
  const { handleSubmit } = useForm();
  const { t } = useTranslation();

  return (
    <>
      <form onSubmit={handleSubmit(onApprove)}>
        <div className={css.deleteWaterContent}>
          <div className={css.deleteTitleGroup}>
            <h2 className={css.deleteWaterTitle}>{t("modals.delete.title")}</h2>
            <p className={css.deleteWaterCaption}>{t("modals.delete.text")}</p>
          </div>
          <div className={css.deleteBtnCont}>
            <button type="submit" className={css.deleteButton}>
              {t("modals.delete.delete")}
            </button>
            <button
              type="button"
              className={css.cancelButton}
              onClick={(event) => {
                event.preventDefault();
                onCancel();
              }}
            >
              {t("modals.delete.cancel")}
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

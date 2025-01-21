import css from "./WaterForm.module.css";
import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import sprite from "../../assets/icons/sprite.svg";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";

export const WaterForm = ({ onSave, initialData }) => {
  const getCurrentTime = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const validationSchema = Yup.object({
    inputField: Yup.number()
      .required("This field is required")
      .min(50, "The value cannot be less than 50")
      .max(5000, "The value cannot exceed 5000"),
    buttonField: Yup.number()
      .required("This field is required")
      .min(50, "The value cannot be less than 50")
      .max(5000, "The value cannot exceed 5000"),
    time: Yup.string()
      .required("Time is required")
      .matches(/^([0-1]\d|2[0-3]):([0-5]\d)$/, "Invalid time format"),
  });

  const {
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      inputField: 50,
      buttonField: 50,
      time: getCurrentTime(),
    },
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data) => {
    onSave(data);
    // reset();
  };
  useEffect(() => {
    if (initialData) {
      reset({
        inputField: initialData.amount || 50,
        buttonField: initialData.amount || 50,
        time: initialData.time || getCurrentTime(),
      });
    }
  }, [initialData, reset]);

  const { t } = useTranslation();

  return (
    <div className={css.waterFormDiv}>
      <div className={css.waterForm}>
        <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
          <div>
            <label className={css.formLabelBtn}>
              {t("modals.addEdit.amount")}
            </label>
            <div className={css.formBtn}>
              <button
                className={css.btn}
                type="button"
                onClick={() => {
                  const newValue = Math.max(50, getValues("buttonField") - 50);
                  setValue("buttonField", newValue);
                  setValue("inputField", newValue);
                }}
              >
                <svg className={css.btnIcon}>
                  <use href={`${sprite}#icon-minus1`}></use>
                </svg>
              </button>
              <Controller
                name="buttonField"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    className={css.btnField}
                    type="text"
                    disabled
                    value={`${field.value} ${t("modals.addEdit.ml")}`}
                    style={{ backgroundColor: "#323f47" }}
                  />
                )}
              />
              <button
                className={css.btn}
                type="button"
                onClick={() => {
                  const newValue = Math.min(
                    5000,
                    getValues("buttonField") + 50
                  );
                  setValue("buttonField", newValue);
                  setValue("inputField", newValue);
                }}
              >
                <svg className={css.btnIcon}>
                  <use href={`${sprite}#icon-plus1`}></use>
                </svg>
              </button>
            </div>
            {errors.buttonField && (
              <span className={css.error}>{errors.buttonField.message}</span>
            )}
          </div>

          <div className={css.time}>
            <label className={css.formLabelTime}>
              {t("modals.addEdit.time")}
            </label>
            <Controller
              name="time"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  className={css.timeField}
                  type="time"
                  style={{
                    padding: "16px 16px",
                    width: "100%",
                    height: "56px",
                    boxSizing: "border-box",
                    WebkitAppearance: "none",
                  }}
                />
              )}
            />
            {errors.time && (
              <span className={css.error}>{errors.time.message}</span>
            )}
          </div>

          <div className={css.keyboard}>
            <label className={css.formLabel}>{t("modals.addEdit.value")}</label>
            <Controller
              name="inputField"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  className={css.keyboardField}
                  type="text"
                  onChange={(e) => {
                    let newValue = e.target.value;
                    if (newValue.startsWith("0") && newValue.length > 1) {
                      newValue = newValue.replace(/^0+/, "");
                    }
                    if (!/^\d*$/.test(newValue)) {
                      return;
                    }
                    const numericValue = Math.min(
                      Math.max(parseInt(newValue || "0", 10), 0),
                      5000
                    );
                    setValue("inputField", numericValue);
                    setValue("buttonField", numericValue);
                  }}
                  value={field.value}
                />
              )}
            />
            {errors.inputField && (
              <span className={css.error}>{errors.inputField.message}</span>
            )}
          </div>

          <button className={css.btnSubmit} type="submit">
            {t("modals.addEdit.saveBtn")}
          </button>
        </form>
      </div>
    </div>
  );
};

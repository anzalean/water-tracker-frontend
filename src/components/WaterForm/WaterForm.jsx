import css from "./WaterForm.module.css";
import { useForm, Controller } from "react-hook-form";
import sprite from "../../assets/icons/sprite.svg";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export const WaterForm = ({ onSave }) => {
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
    console.log("Form submitted with values:", data);
    onSave(data);
    reset();
  };

  return (
    <div>
      <div className={css.waterForm}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className={css.formLabelBtn}>Amount of water:</label>
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
                    value={`${field.value} ml`}
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
            <label className={css.formLabelTime}>Recording time:</label>
            <Controller
              name="time"
              control={control}
              render={({ field }) => (
                <input {...field} className={css.timeField} type="time" />
              )}
            />
            {errors.time && (
              <span className={css.error}>{errors.time.message}</span>
            )}
          </div>

          <div className={css.keyboard}>
            <label className={css.formLabel}>
              Enter the value of the water used:
            </label>
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
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

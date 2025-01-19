import clsx from "clsx";
import { useFormContext, Controller } from "react-hook-form";
import css from "./RadioButtonsGroup.module.css";

const RadioButtonsGroup = ({
  name,
  label,
  options = [],
  defaultValue,
  className,
}) => {
  const { control } = useFormContext();

  return (
    <div className={className}>
      {label && <p className={css.groupLabel}>{label}</p>}
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field }) => (
          <div className={css.radioGroup}>
            {options.map((option, index) => (
              <div key={index} className={css.radioOption}>
                <input
                  type="radio"
                  value={option.value}
                  id={`${name}-${option.value}`}
                  checked={field.value === option.value}
                  onChange={() =>
                    field.onChange(
                      field.value === option.value ? undefined : option.value
                    )
                  }
                  className={css.radioInput}
                />
                <label
                  htmlFor={`${name}-${option.value}`}
                  className={clsx(css.customRadio, css[option.value])}
                >
                  <span className={css.outerCircle}>
                    <span className={css.innerCircle} />
                  </span>
                  <span className={css.optionLabel}>{option.label}</span>
                </label>
              </div>
            ))}
          </div>
        )}
      />
    </div>
  );
};

export default RadioButtonsGroup;

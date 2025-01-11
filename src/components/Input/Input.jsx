import React, { useState } from "react";
import clsx from "clsx";
import { useFormContext } from "react-hook-form";
import iconsPath from "../../assets/icons/sprite.svg";
import css from "./Input.module.css";

function Input(
  {
    name,
    onChange,
    value,
    placeholder,
    type,
    classInput = "",
    classLabel = "",
    label,
  },
  ref
) {
  const [showPassword, setShowPassword] = useState(false);
  const {
    setValue,
    formState: { errors },
  } = useFormContext();

  const handleTooglePassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleClearInput = () => {
    setValue(name, "");
  };

  const inputType = type === "password" && showPassword ? "text" : type;
  const inputClass = clsx(css.input, errors[name] && css.red, classInput);

  return (
    <div className={css.wrapper}>
      {label && (
        <label htmlFor={name} className={clsx(css.label, classLabel)}>
          {label}
        </label>
      )}{" "}
      <input
        ref={ref}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={inputClass}
        type={inputType}
      />
      {type === "password" && (
        <span
          onClick={handleTooglePassword}
          className={css.eyeIconContainer}
          aria-label="Eye icon"
        >
          {showPassword ? (
            <svg className={css.eyeIcon}>
              <use href={`${iconsPath}#icon-eye`} />
            </svg>
          ) : (
            <svg className={css.eyeIcon}>
              <use href={`${iconsPath}#icon-eye-off`} />
            </svg>
          )}
        </span>
      )}
      {errors[name] && value && (
        <span
          onClick={handleClearInput}
          className={clsx(css.icon, type === "password" && css.shift)}
        ></span>
      )}
      {errors[name] && (
        <span className={clsx(css.message, css.error)}>
          {errors[name].message}
        </span>
      )}
    </div>
  );
}

export default React.forwardRef(Input);

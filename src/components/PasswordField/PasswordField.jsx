import { useState } from "react";
import s from "./PasswordField.module.css";
import sprite from "../../assets/icons/sprite.svg";

export default function PasswordField({
  id,
  label,
  placeholder,
  error,
  register,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword((prev) => !prev);

  return (
    <div className={s.field}>
      <label htmlFor={id} className={s.label}>
        {label}
      </label>
      <div className={s.passwordWrapper}>
        <input
          id={id}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          {...register}
          className={`${s.input} ${error ? s.errorInput : ""}`}
        />
        <button
          type="button"
          className={s.togglePasswordButton}
          onClick={togglePassword}
          aria-label="Toggle password visibility"
        >
          <svg className={s.icon}>
            <use
              href={`${sprite}#${showPassword ? "icon-eye" : "icon-eye-off"}`}
            />
          </svg>
        </button>
      </div>
      {error && <p className={s.error}>{error}</p>}
    </div>
  );
}

import s from "./InputField.module.css";

export default function InputField({
  id,
  label,
  type,
  placeholder,
  error,
  register,
}) {
  return (
    <div className={s.field}>
      <label htmlFor={id} className={s.label}>
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        {...register}
        className={`${s.input} ${error ? s.errorInput : ""}`}
      />
      {error && <p className={s.error}>{error}</p>}
    </div>
  );
}

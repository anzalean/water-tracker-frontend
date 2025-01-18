import Logo from "../Logo/Logo";
import PasswordField from "../PasswordField/PasswordField";
import styles from "./ResetPasswordForm.module.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { resetPassword } from "../../redux/user/userOps";
import { useState } from "react";

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

export default function ResetPasswordForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { resetToken } = useParams();
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data) => {
    try {
      await dispatch(
        resetPassword({ password: data.password, resetToken })
      ).unwrap();
      reset();
      setServerError("");
      navigate("/signin");
    } catch (error) {
      setServerError(error || "Failed to reset password. Please try again.");
    }
  };

  return (
    <div className={styles.resetPasswordContainer}>
      <div className={styles.logoContainer}>
        <Logo />
      </div>
      <form
        className={styles.form}
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <h2 className={styles.resetPasswordTitle}>
          Reset your password. <br />
          <span className={styles.subTitle}>Create new password.</span>
        </h2>
        <PasswordField
          id="password"
          label="Password"
          placeholder="Enter your password"
          error={errors.password?.message}
          register={register("password")}
        />
        <PasswordField
          id="confirmPassword"
          label="Confirm Password"
          placeholder="Confirm your password"
          error={errors.confirmPassword?.message}
          register={register("confirmPassword")}
        />
        {serverError && <p className={styles.error}>{serverError}</p>}
        <button type="submit" className={styles.button}>
          Save new password
        </button>
      </form>
    </div>
  );
}

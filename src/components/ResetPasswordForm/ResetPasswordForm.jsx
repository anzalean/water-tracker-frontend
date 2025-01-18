import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { resetPassword } from "../../redux/user/userOps";
import Logo from "../Logo/Logo";
import PasswordField from "../PasswordField/PasswordField";
import styles from "./ResetPasswordForm.module.css";

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .max(50, "Password must be at most 50 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

export default function ResetPasswordForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onTouched",
  });

  const onSubmit = async (data) => {
    try {
      const queryParams = new URLSearchParams(location.search);
      const resetTokenFromURL = queryParams.get("token");

      await dispatch(
        resetPassword({ password: data.password, resetToken: resetTokenFromURL })
      ).unwrap();

      reset();
      setServerError("");
      toast.success("Password reset successful.");
      navigate("/signin");
    } catch (error) {
      setServerError(error?.message || "Failed to reset password. Please try again.");
      toast.error("Failed to reset password. Please try again.");
    }
  };

  useEffect(() => {
    if (errors.password) {
      toast.error(errors.password.message);
    } else if (errors.confirmPassword) {
      toast.error(errors.confirmPassword.message);
    }
  }, [errors]);

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
        <button type="submit" className={styles.button} disabled={!isValid}>
          Save new password
        </button>
      </form>
    </div>
  );
}
import { useForm } from "react-hook-form";
import s from "./SigninForm.module.css";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";
import sprite from "../../assets/icons/sprite.svg";
import Logo from "../Logo/Logo";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Some error message")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Email must be a valid address"
    )
    .min(5, "Email is too short")
    .max(50, "Email is too long")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Some error password")
    .matches(/[a-zA-Z]/, "Password must contain at least one letter")
    .matches(/\d/, "Password must contain at least one number")
    .required("Password is required"),
});

export default function SigninForm() {
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword((prev) => !prev);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("/api/login", data);

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        history.push("/tracker");
      }
    } catch (error) {
      if (error.response) {
        toast.error(
          error.response.data.message ||
            "Something went wrong. Please try again."
        );
      } else {
        toast.error("Server connection error");
      }
    }
  };

  return (
    <div className={s.SignInPage}>
      <div className={s.logoContainer}>
        <Logo />
      </div>
      <form className={s.form} onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className={s.field}>
          <h2 className={s.signInTitle}>Sign In</h2>
          <label htmlFor="email" className={s.label}>
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            {...register("email")}
            className={`${s.input} ${errors.email ? s.errorInput : ""}`}
          />
          {errors.email && <p className={s.error}>{errors.email.message}</p>}
        </div>

        <div className={s.field}>
          <label htmlFor="password" className={s.label}>
            Password
          </label>
          <div className={s.passwordWrapper}>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              {...register("password")}
              className={`${s.input} ${errors.password ? s.errorInput : ""}`}
            />
            <button
              type="button"
              className={s.togglePasswordButton}
              onClick={togglePassword}
              aria-label="Toggle password visibility"
            >
              <svg className={s.icon}>
                <use
                  href={`${sprite}#${
                    showPassword ? "icon-eye" : "icon-eye-off"
                  }`}
                />
              </svg>
            </button>
          </div>
          {errors.password && (
            <p className={s.error}>{errors.password.message}</p>
          )}
        </div>
        <button type="submit" className={s.button}>
          Sign In
        </button>

        <p className={s.footer}>
          Don’t have an account?{" "}
          <a href="/signup" className={s.link}>
            Sign Up
          </a>
        </p>
      </form>
    </div>
  );
}

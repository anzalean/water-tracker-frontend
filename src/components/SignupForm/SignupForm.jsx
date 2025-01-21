import { useForm } from "react-hook-form";
import s from "./SignupForm.module.css";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Logo from "../Logo/Logo";
import InputField from "../InputField/InputField";
import PasswordField from "../PasswordField/PasswordField";
import FormFooter from "../FormFooter/FormFooter";
import { useDispatch } from "react-redux";
import { signUp } from "../../redux/user/userOps";
import { useNavigate } from "react-router-dom";
import GoogleButton from "../GoogleButton/GoogleButton";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Email must be a valid address"
    )
    .min(5, "Email is too short")
    .required("Email  is required"),
  password: Yup.string()
    .min(6, "Password is too short")
    .matches(/[a-zA-Z]/, "Password must contain at least one letter")
    .matches(/\d/, "Password must contain at least one number")
    .required("Password  is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Please repeat your password"),
});

export default function SignupForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
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
    setServerError("");
    // eslint-disable-next-line no-unused-vars
    const { confirmPassword, ...userData } = data;
    try {
      const response = await dispatch(signUp(userData)).unwrap();
      if (response.status === 201) {
        navigate("/signin");
        reset();
      }
    } catch (error) {
      setServerError(error.message || "Registration failed. Please try again.");
    }
  };

  return (
    <div className={s.SignUpContainer}>
      <div className={s.logoContainer}>
        <Logo />
      </div>
      <form className={s.form} onSubmit={handleSubmit(onSubmit)} noValidate>
        <h2 className={s.signupTitle}>{t("signUpPage.signUp")}</h2>
        <InputField
          id="email"
          label={t("signUpPage.email")}
          type="email"
          placeholder={t("signUpPage.emailPlaceholder")}
          error={errors.email?.message}
          register={register("email")}
        />
        <PasswordField
          id="password"
          label={t("signUpPage.password")}
          placeholder={t("signUpPage.passwordPlaceholder")}
          error={errors.password?.message}
          register={register("password")}
        />
        <PasswordField
          id="confirmPassword"
          label={t("signUpPage.repeatPassword")}
          placeholder={t("signUpPage.repeatPassword")}
          error={errors.confirmPassword?.message}
          register={register("confirmPassword")}
        />
        {serverError && <p className={s.error}>{serverError}</p>}
        <button type="submit" className={s.button}>
          {t("signUpPage.signUp")}
        </button>
        <GoogleButton text="Sign up with Google" />
        <FormFooter
          text={t("signUpPage.textAlready")}
          linkText={t("signUpPage.signIn")}
          linkHref="/signin"
        />
      </form>
    </div>
  );
}

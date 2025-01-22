import { useForm } from "react-hook-form";
import s from "./SigninForm.module.css";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Logo from "../Logo/Logo";
import InputField from "../InputField/InputField";
import PasswordField from "../PasswordField/PasswordField";
import FormFooter from "../FormFooter/FormFooter";
import { signIn } from "../../redux/user/userOps";
import { useDispatch } from "react-redux";
import { useState } from "react";
import GoogleButton from "../GoogleButton/GoogleButton";
import { useTranslation } from "react-i18next";

const createValidationSchema = (t) =>
  Yup.object().shape({
    email: Yup.string()
      .email(t("signInPage.emailSpanError")) // "Invalid email address"
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        t("validation.emailValid") // "Email must be a valid address"
      )
      .min(5, t("validation.emailShort")) // "Email is too short"
      .max(50, t("validation.emailLong")) // "Email is too long"
      .required(t("validation.emailRequired")), // "Email is required"
    password: Yup.string()
      .min(8, t("signInPage.passwordSpanError")) // "Password is too short"
      .max(50, t("validation.passwordLong"))
      .required(t("validation.passwordRequired")), // "Password is required"
  });

export default function SigninForm() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [serverError, setServerError] = useState("");
  const validationSchema = createValidationSchema(t);
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
      await dispatch(signIn(data)).unwrap();
      reset();
      setServerError("");
    } catch (error) {
      console.error("Sign in error:", error);
      setServerError(
        error.message ||
          "Please check your password and account name and try again."
      );
    }
  };

  return (
    <div className={s.SignInContainer}>
      <div className={s.logoContainer}>
        <Logo />
      </div>
      <form className={s.form} onSubmit={handleSubmit(onSubmit)} noValidate>
        <h2 className={s.signInTitle}>{t("signInPage.signIn")}</h2>
        <InputField
          id="email"
          label={t("signInPage.email")}
          type="email"
          placeholder={t("signInPage.emailPlaceholder")}
          error={errors.email?.message}
          register={register("email")}
        />
        <PasswordField
          id="password"
          label={t("signInPage.password")}
          placeholder={t("signInPage.passwordPlaceholder")}
          error={errors.password?.message}
          register={register("password")}
        />
        {serverError && <p className={s.error}>{serverError}</p>}
        <button type="submit" className={s.button}>
          {t("signInPage.signIn")}
        </button>
        <GoogleButton />
        <FormFooter
          text={t("signInPage.dontAccount")}
          linkText={t("signInPage.signUp")}
          linkHref="/signup"
        />
        <FormFooter
          text={t("signInPage.forgotPassword")}
          linkText={t("signInPage.renew")}
          linkHref="/verify/:verifyToken"
        />
      </form>
    </div>
  );
}

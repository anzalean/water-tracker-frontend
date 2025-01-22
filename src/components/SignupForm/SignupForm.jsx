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

const validationSchema = (t) =>
  Yup.object().shape({
    email: Yup.string()
      .email(t("signUpPage.emailSpanError"))
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        t("validation.emailValid")
      )
      .min(5, t("validation.emailShort"))
      .max(50, t("validation.emailLong"))
      .required(t("validation.emailRequired")),
    password: Yup.string()
      .min(8, t("signUpPage.passwordSpanError"))
      .max(50, t("validation.passwordLong"))
      .matches(/[a-zA-Z]/, t("validation.passwordContainsLetter"))
      .matches(/\d/, t("validation.passwordContainsNumber"))
      .required(t("validation.passwordRequired")),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], t("validation.passwordMatch"))
      .required(t("validation.passwordRepeat")),
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
    resolver: yupResolver(validationSchema(t)),
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
        <GoogleButton text="googleButton.googleUpBtn" />
        <FormFooter
          text={t("signUpPage.textAlready")}
          linkText={t("signUpPage.signIn")}
          linkHref="/signin"
        />
      </form>
    </div>
  );
}

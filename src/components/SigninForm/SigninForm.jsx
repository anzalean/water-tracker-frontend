import { useForm } from "react-hook-form";
import s from "./SigninForm.module.css";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Logo from "../Logo/Logo";
import InputField from "../InputField/InputField";
import PasswordField from "../PasswordField/PasswordField";
import FormFooter from "../FormFooter/FormFooter";
import { googleLogin, signIn } from "../../redux/user/userOps";
import { useDispatch } from "react-redux";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import { useState } from "react";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Email must be a valid address"
    )
    .min(5, "Email is too short")
    .max(50, "Email is too long")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Some error password")
    .required("Password is required"),
});

export default function SigninForm() {
  const dispatch = useDispatch();
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

  const googleLoginClick = useGoogleLogin({
    onSuccess: (response) => {
      if (response?.credential) {
        const token = response.credential;
        dispatch(googleLogin({ token }));
      }
    },
  });

  return (
    <div className={s.SignInContainer}>
      <div className={s.logoContainer}>
        <Logo />
      </div>
      <form className={s.form} onSubmit={handleSubmit(onSubmit)} noValidate>
        <h2 className={s.signInTitle}>Sign In</h2>
        <InputField
          id="email"
          label="Email"
          type="email"
          placeholder="Enter your email"
          error={errors.email?.message}
          register={register("email")}
        />
        <PasswordField
          id="password"
          label="Password"
          placeholder="Enter your password"
          error={errors.password?.message}
          register={register("password")}
        />
        {serverError && <p className={s.error}>{serverError}</p>}
        <button type="submit" className={s.button}>
          Sign In
        </button>
        <button
          type="button"
          onClick={googleLoginClick}
          className={s.googleButton}
        >
          <FcGoogle className={s.googleIcon} />
          <span className={s.googleText}>Sign in with Google</span>
        </button>
        <FormFooter
          text="Don’t have an account?"
          linkText="Sign Up"
          linkHref="/signup"
        />
        <FormFooter
          text="Forgot your password? "
          linkText="Click here"
          linkHref="/verify/:verifyToken"
        />
      </form>
    </div>
  );
}

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
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data) => {
    dispatch(signUp(data));
    reset();
  };

  return (
    <div className={s.SignUpContainer}>
      <div className={s.logoContainer}>
        <Logo />
      </div>
      <form className={s.form} onSubmit={handleSubmit(onSubmit)} noValidate>
        <h2 className={s.signupTitle}>Sign Up</h2>
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
          placeholder="Create your password"
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
        <button type="submit" className={s.button}>
          Sign Up
        </button>
        <FormFooter
          text="Already have account?"
          linkText="Sign In"
          linkHref="/signin"
        />
      </form>
    </div>
  );
}

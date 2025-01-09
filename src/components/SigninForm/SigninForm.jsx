import { useForm } from "react-hook-form";
import s from "./SigninForm.module.css";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import toast from "react-hot-toast";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Some error message")
    .required("Password is required"),
  password: Yup.string()
    .min(6, "Some error password")
    .required("Email is required"),
});

export default function SigninForm() {
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
    <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
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
        <input
          id="password"
          type="password"
          placeholder="Enter your password"
          {...register("password")}
          className={`${s.input} ${errors.password ? s.errorInput : ""}`}
        />
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
  );
}

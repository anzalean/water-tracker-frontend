import { useForm } from "react-hook-form";
import s from "./EmailVerifyForm.module.css";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Logo from "../Logo/Logo";
import InputField from "../InputField/InputField";
import { sendResetEmail } from "../../redux/user/userOps";
import { useDispatch } from "react-redux";

const validationSchema = Yup.object().shape({
    email: Yup.string()
        .email("Invalid email address")
        .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Email must be a valid address"
        )
        .min(5, "Email is too short")
        .max(50, "Email is too long")
        .required("Email is required")
});

export default function EmailVerifyForm() {
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
        try {
            dispatch(sendResetEmail(data));
            reset();
        } catch (error) {
            console.error("Error sending reset email:", error);
        };
    };

    return (
        <div className={s.EmailVerifyContainer}>
            <div className={s.logoContainer}>
                <Logo />
            </div>
            <form className={s.form} onSubmit={handleSubmit(onSubmit)} noValidate>
                <h2 className={s.verifyTitle}>Send Reset Email</h2>
                <InputField
                    id="email"
                    label="Email"
                    type="email"
                    placeholder="Enter your email"
                    error={errors.email?.message}
                    register={register("email")}
                />
                <button type="primary" className={s.button}>
                    Send Reset Email
                </button>
            </form>
        </div>
    );

    }

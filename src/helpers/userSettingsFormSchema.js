import * as Yup from "yup";

export const feedbackSchema = Yup.object().shape({
  gender: Yup.string()
    .oneOf(["male", "female"], "Gender must be either 'male' or 'female'")
    .default("female")
    .typeError("Gender must be a string")
    .notRequired(),

  name: Yup.string()
    .min(2, "Name must be at least 2 characters long.")
    .max(50, "Name cannot exceed 50 characters.")
    .typeError("Name must be a string")
    .notRequired(),

  email: Yup.string()
    .email("Please enter a valid email address.")
    .typeError("Email must be a string")
    .required("Email is required."),

  sportTime: Yup.number()
    .typeError("Sport time must be a number")
    .min(0, "Sport time cannot be negative.")
    .max(24, "Sport time cannot exceed 24 hours.")
    .notRequired(),

  weight: Yup.number()
    .typeError("Weight must be a number")
    .min(0, "Weight cannot be negative.")
    .max(350, "Weight cannot exceed 350 kg.")
    .notRequired(),

  waterNorm: Yup.number()
    .typeError("Water intake must be a number")
    .min(50, "Water intake must be at least 50 ml.")
    .max(5000, "Water intake cannot exceed 5000 ml.")
    .required("Water intake is required."),
});

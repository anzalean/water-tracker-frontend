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
    .transform((value, originalValue) => {
      return originalValue === "" ? undefined : value;
    })
    .notRequired(),

  email: Yup.string()
    .email("Please enter a valid email address.")
    .typeError("Email must be a string")
    .required("Email is required."),

  activityTime: Yup.number()
    .typeError("Sport time must be a number")
    .min(0, "Sport time cannot be negative.")
    .max(24, "Sport time cannot exceed 24 hours.")
    .default(0)
    .transform((value, originalValue) =>
      originalValue === "" || originalValue == null ? 0 : value
    )
    .notRequired(),

  weight: Yup.number()
    .typeError("Weight must be a number")
    .min(0, "Weight cannot be negative.")
    .max(350, "Weight cannot exceed 350 kg.")
    .default(0)
    .transform((value, originalValue) =>
      originalValue === "" || originalValue == null ? 0 : value
    )
    .notRequired(),

  desiredVolume: Yup.number()
    .typeError("Water intake must be a number")
    .min(0.05, "Water intake must be at least 0.05 L.")
    .max(5, "Water intake cannot exceed 5 L.")
    .required("Water intake is required."),
});

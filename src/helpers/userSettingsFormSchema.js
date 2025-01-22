import * as Yup from "yup";
import i18n from "i18next";

export const feedbackSchema = Yup.object().shape({
  gender: Yup.string()
    .oneOf(
      ["male", "female"],
      i18n.t("validationSettings.gender.oneOf", {
        defaultValue: "Gender must be either 'male' or 'female'",
      })
    )
    .default("female")
    .typeError(
      i18n.t("validationSettings.gender.typeError", {
        defaultValue: "Gender must be a string",
      })
    )
    .notRequired(),

  name: Yup.string()
    .min(
      2,
      i18n.t("validationSettings.name.min", {
        defaultValue: "Name must be at least 2 characters long.",
      })
    )
    .max(
      50,
      i18n.t("validationSettings.name.max", {
        defaultValue: "Name cannot exceed 50 characters.",
      })
    )
    .typeError(
      i18n.t("validationSettings.name.typeError", {
        defaultValue: "Name must be a string",
      })
    )
    .transform((value, originalValue) => {
      return originalValue === "" ? undefined : value;
    })
    .notRequired(),

  email: Yup.string()
  .email(
    i18n.t("validationSettings.email.email", { defaultValue: "Please enter a valid email address." })
  )
  .typeError(i18n.t("validationSettings.email.typeError", { defaultValue: "Email must be a string" }))
  .required(i18n.t("validationSettings.email.required", { defaultValue: "Email is required." })),

  activityTime: Yup.number()
  .typeError(i18n.t("validationSettings.activityTime.typeError", { defaultValue: "Sport time must be a number" }))
  .min(0, i18n.t("validationSettings.activityTime.min", { defaultValue: "Sport time cannot be negative." }))
  .max(24, i18n.t("validationSettings.activityTime.max", { defaultValue: "Sport time cannot exceed 24 hours." }))
    .default(0)
    .transform((value, originalValue) =>
      originalValue === "" || originalValue == null ? 0 : value
    )
    .notRequired(),

  weight: Yup.number()
    .typeError(i18n.t("validationSettings.weight.typeError", { defaultValue: "Weight must be a number" }))
    .min(0, i18n.t("validationSettings.weight.min", { defaultValue: "Weight cannot be negative." }))
    .max(350, i18n.t("validationSettings.weight.max", { defaultValue: "Weight cannot exceed 350 kg." }))
    .default(0)
    .transform((value, originalValue) =>
      originalValue === "" || originalValue == null ? 0 : value
    )
    .notRequired(),

  desiredVolume: Yup.number()
  .typeError(i18n.t("validationSettings.desiredVolume.typeError", { defaultValue: "Water intake must be a number" }))
  .min(
    0.05,
    i18n.t("validationSettings.desiredVolume.min", { defaultValue: "Water intake must be at least 0.05 L." })
  )
  .max(5, i18n.t("validationSettings.desiredVolume.max", { defaultValue: "Water intake cannot exceed 5 L." }))
  .required(i18n.t("validationSettings.desiredVolume.required", { defaultValue: "Water intake is required." })),
});

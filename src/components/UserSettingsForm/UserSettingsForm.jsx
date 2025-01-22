import { useForm, FormProvider, Controller } from "react-hook-form";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import clsx from "clsx";
import { yupResolver } from "@hookform/resolvers/yup";
import UserIconElem from "../UserIconElem/UserIconElem";
import UserImageElem from "../UserImageElem/UserImageElem";
import Input from "../Input/Input";
import RadioButtonsGroup from "../RadioButtonsGroup/RadioButtonsGroup";
import UploadFileButton from "../UploadFileButton/UploadFileButton";
import { feedbackSchema } from "../../helpers/userSettingsFormSchema";
import { selectUser } from "../../redux/user/selectors";
import iconsPath from "../../assets/icons/sprite.svg";
import css from "./UserSettingsForm.module.css";
import { useTranslation } from "react-i18next";

const UserSettingsForm = ({ handleUserSave }) => {
  const {
    gender,
    name,
    email,
    weight,
    activityTime,
    desiredVolume,
    avatarURL,
  } = useSelector(selectUser);
  const { t } = useTranslation();

  const options = [
    { value: "female", label: t("modals.UserSettingsForm.femaleGenderLabel") },
    { value: "male", label: t("modals.UserSettingsForm.femaleGenderMale") },
  ];

  const [avatarFile, setAvatarFile] = useState(null);
  const [avatar, setAvatar] = useState(avatarURL);

  const methods = useForm({
    resolver: yupResolver(feedbackSchema),
    defaultValues: feedbackSchema.cast({
      name: name || email || "",
      email: email || "",
      weight: weight || 0,
      desiredVolume: desiredVolume || 50,
      activityTime: activityTime || 0,
      gender: gender || "female",
    }),
    shouldUnregister: true,
  });

  const { handleSubmit, watch } = methods;

  const genderValue = watch("gender");
  const weightValue = watch("weight");
  const activeTimeValue = watch("activityTime");
  const [calculatedWaterNorm, setCalculatedWaterNorm] = useState(0);

  useEffect(() => {
    const weight = parseFloat(weightValue) || 0;
    const activeTime = parseFloat(activeTimeValue) || 0;

    if (!isNaN(weight) && !isNaN(activeTime)) {
      const waterNorm =
        genderValue === "female"
          ? weight * 0.03 + activeTime * 0.4
          : weight * 0.04 + activeTime * 0.6;
      setCalculatedWaterNorm(parseFloat(waterNorm.toFixed(4)));
    } else {
      setCalculatedWaterNorm(0);
    }
  }, [genderValue, weightValue, activeTimeValue]);

  const onSubmit = async (values) => {
    if (avatarFile) {
      values.avatar = avatarFile;
    }
    handleUserSave && handleUserSave(values);
  };

  const handleEditAvatar = (newAvatarUrl, avatarFile) => {
    setAvatarFile(avatarFile);
    setAvatar(newAvatarUrl);
  };

  const removeLeadingZeros = (value) => {
    
      // Видаляємо всі провідні нулі, крім одного нуля для числа 0
    return value ? Number(value) : 0;
  };


  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
        <p className={css.title}>{t("modals.UserSettingsForm.setting")}</p>

        <div className={css.imgWrapper}>
          {avatarURL ? (
            <UserImageElem imgUrl={avatar} altText={`Photo of ${name}`} />
          ) : (
            <UserIconElem />
          )}
          <UploadFileButton
            icon={
              <svg className={css.btnIconContainer} aria-label="Upload icon">
                <use
                  className={css.btnIcon}
                  href={`${iconsPath}#icon-upload`}
                />
              </svg>
            }
            className={css.uploadBtn}
            onFileSelect={handleEditAvatar}
          >
            {t("modals.UserSettingsForm.uploadPhotoBtn")}
          </UploadFileButton>
        </div>

        <RadioButtonsGroup
          name="gender"
          label={t("modals.UserSettingsForm.yourGenderLabel")}
          defaultValue={gender || "female"}
          options={options}
          className={css.genderContainer}
        />
        <div className={css.content}>
          <div className={css.firstCol}>
            <div className={css.userInfoContainer}>
              <Controller
                name="name"
                control={methods.control}
                render={({ field }) => (
                  <Input
                    {...field}
                    label={t("modals.UserSettingsForm.placeYourName")}
                    type="text"
                  />
                )}
              />
              <Controller
                name="email"
                control={methods.control}
                render={({ field }) => (
                  <Input
                    {...field}
                    label={t("modals.UserSettingsForm.labelEmail")}
                    type="text"
                  />
                )}
              />
            </div>
            <div className={css.calcContainer}>
              <p className={clsx(css.boldLabel)}>
                {t("modals.UserSettingsForm.dailyNormah")}
              </p>
              <div className={css.calcGenderContainer}>
                <div className={css.calcFormulaContainer}>
                  <span className={css.calcGenderLabel}>
                    {t("modals.UserSettingsForm.forWomanP")}
                  </span>
                  <span className={css.calcGenderFormula}>
                    V=(M*0,03) + (T*0,4)
                  </span>
                </div>
                <div className={css.calcFormulaContainer}>
                  <span className={css.calcGenderLabel}>
                    {t("modals.UserSettingsForm.forManP")}
                  </span>
                  <span className={css.calcGenderFormula}>
                    V=(M*0,04) + (T*0,6)
                  </span>
                </div>
              </div>
              <div className={clsx(css.calcNote, css.text)}>
                <span className={css.calcAsterix}>*</span>{" "}
                {t("modals.UserSettingsForm.starText")}
              </div>
            </div>
            <div className={css.activeTimeContainer}>
              <span className={css.ExclamationContainer}>
                <svg className={css.ExclamationIcon}>
                  <use href={`${iconsPath}#icon-exclamation-mark`} />
                </svg>
              </span>
              &nbsp;
              <span className={css.textActiveTime}>
                {t("modals.UserSettingsForm.activeText")}
              </span>
            </div>
          </div>

          <div className={css.secondCol}>
            <div className={css.userInfoContainer}>
              <Controller
                name="weight"
                control={methods.control}
                render={({ field }) => (
                  <Input
                    {...field}
                    value={removeLeadingZeros(field.value)}
                    classLabel={css.thinkLabel}
                    label={t("modals.UserSettingsForm.infoUser")}
                    type="text"
                    onChange={(e) =>
                      field.onChange(removeLeadingZeros(e.target.value))
                    }
                  />
                )}
              />
              <Controller
                name="activityTime"
                control={methods.control}
                render={({ field }) => (
                  <Input
                    {...field}
                    value={removeLeadingZeros(field.value)}
                    classLabel={css.thinkLabel}
                    label={t("modals.UserSettingsForm.TheTimeSportsLabel")}
                    type="text"
                    onChange={(e) =>
                      field.onChange(removeLeadingZeros(e.target.value))
                    }
                  />
                )}
              />
            </div>
            <div className={css.requiredContainer}>
              <span>
                <span className={css.textNorma}>
                  {t("modals.UserSettingsForm.requiredWater")}&nbsp;
                </span>
                <span className={css.calculatedNorma}>
                  <span>
                    {calculatedWaterNorm}&nbsp;
                    {t("modals.UserSettingsForm.l")}
                  </span>
                </span>
              </span>

              <Controller
  name="desiredVolume"
  control={methods.control}
  render={({ field }) => (
    <Input
      {...field}
      value={field.value || ''} // Забезпечуємо, що значення не є undefined
      label={t("modals.UserSettingsForm.writeDownLabel")}
      type="text"
      onChange={(e) => {
        let value = e.target.value;

        // Замінюємо кому на крапку для уніфікованого формату
        value = value.replace(/,/g, '.');

        // Дозволяємо лише цифри, одну крапку, ігноруючи зайві символи
        value = value.replace(/[^0-9.]/g, '');

        // Забезпечуємо, що крапка з'являється тільки одна
        if ((value.match(/\./g) || []).length > 1) {
          value = value.slice(0, value.lastIndexOf('.'));
        }

        // Видаляємо провідні нулі тільки перед цілим числом
        value = value.replace(/^0+(?=\d)/, '');

        // Якщо поле порожнє, встановлюємо значення 0
        if (value.trim() === '') {
          value = '0';
        }

        field.onChange(value);
      }}
    />
  )}
/>


            </div>
          </div>
        </div>
        <button type="submit" className={css.btn}>
          {t("modals.UserSettingsForm.saveBtn")}
        </button>
      </form>
    </FormProvider>
  );
};

export default UserSettingsForm;

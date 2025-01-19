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

const options = [
  { value: "female", label: "Female" },
  { value: "male", label: "Male" },
];

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

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
        <p className={css.title}>Settings</p>

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
            Upload photo
          </UploadFileButton>
        </div>

        <RadioButtonsGroup
          name="gender"
          label="Your gender identity"
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
                  <Input {...field} label="Name" type="text" />
                )}
              />
              <Controller
                name="email"
                control={methods.control}
                render={({ field }) => (
                  <Input {...field} label="Email" type="text" />
                )}
              />
            </div>
            <div className={css.calcContainer}>
              <p className={clsx(css.boldLabel)}>My daily norma</p>
              <div className={css.calcGenderContainer}>
                <div className={css.calcFormulaContainer}>
                  <span className={css.calcGenderLabel}>For woman: </span>
                  <span className={css.calcGenderFormula}>
                    V=(M*0,03) + (T*0,4)
                  </span>
                </div>
                <div className={css.calcFormulaContainer}>
                  <span className={css.calcGenderLabel}>For man: </span>
                  <span className={css.calcGenderFormula}>
                    V=(M*0,04) + (T*0,6)
                  </span>
                </div>
              </div>
              <div className={clsx(css.calcNote, css.text)}>
                <span className={css.calcAsterix}>*</span> V is the volume of
                the water norm in liters per day, M is your body weight, T is
                the time of active sports, or another type of activity
                commensurate in terms of loads (in the absence of these, you
                must set 0){" "}
              </div>
            </div>
            <div className={css.activeTimeContainer}>
              <span className={css.ExclamationContainer}>
                <svg className={css.ExclamationIcon}>
                  <use href={`${iconsPath}#icon-exclamation-mark`} />
                </svg>
              </span>
              &nbsp;
              <span className={css.textActiveTime}>Active time in hours</span>
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
                    classLabel={css.thinkLabel}
                    label="Your weight in kilograms:"
                    type="text"
                  />
                )}
              />
              <Controller
                name="activityTime"
                control={methods.control}
                render={({ field }) => (
                  <Input
                    {...field}
                    classLabel={css.thinkLabel}
                    label="The time of active participation in sports:"
                    type="text"
                  />
                )}
              />
            </div>
            <div className={css.requiredContainer}>
              <span>
                <span className={css.textNorma}>
                  The required amount of water in liters per day:&nbsp;
                </span>
                <span className={css.calculatedNorma}>
                  <span>{calculatedWaterNorm}&nbsp;L</span>
                </span>
              </span>

              <Controller
                name="desiredVolume"
                control={methods.control}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Write down how much water you will drink:"
                    type="text"
                  />
                )}
              />
            </div>
          </div>
        </div>
        <button type="submit" className={css.btn}>
          Save
        </button>
      </form>
    </FormProvider>
  );
};

export default UserSettingsForm;

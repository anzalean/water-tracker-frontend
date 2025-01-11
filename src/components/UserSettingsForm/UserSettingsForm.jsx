import { useForm, FormProvider, Controller } from "react-hook-form";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import clsx from "clsx";
import { yupResolver } from "@hookform/resolvers/yup";
import UserIconElem from "../UserIconElem/UserIconElem";
import UserImageElem from "../UserImageElem/UserImageElem";
import Input from "../../Input/Input";
import RadioButtonsGroup from "../RadioButtonsGroup/RadioButtonsGroup";
import UploadFileButton from "../UploadFileButton/UploadFileButton";
import { feedbackSchema } from "../helpers/userSettingsFormSchema";
import { selectUser } from "../../redux/user/selectors";
import iconsPath from "../../assets/icons/sprite.svg";
import css from "./UserSettingsForm.module.css";

const UserSettingsForm = ({ handleUserSave }) => {
  const { name, email, weight, sportTime, waterNorm, avatar } =
    useSelector(selectUser);
  const [avatarFile, setAvatarFile] = useState(null);
  const methods = useForm({
    resolver: yupResolver(feedbackSchema),
    defaultValues: {
      name: name || email,
      email: email,
      weight: weight || 0,
      waterNorm: waterNorm || 50,
      sportTime: sportTime || 0,
      avatar: avatar,
      gender: "female",
    },
  });

  const { handleSubmit, setValue, watch } = methods;

  const gender = watch("gender");
  const weightValue = watch("weight");
  const activeTimeValue = watch("activeTime");
  const [calculatedWaterNorm, setCalculatedWaterNorm] = useState(0);

  useEffect(() => {
    if (weightValue && activeTimeValue) {
      const weight = parseFloat(weightValue);
      const activeTime = parseFloat(activeTimeValue);

      if (!isNaN(weight) && !isNaN(activeTime)) {
        const waterNorm =
          gender === "female"
            ? weight * 0.03 + activeTime * 0.4
            : weight * 0.04 + activeTime * 0.6;
        setCalculatedWaterNorm(waterNorm.toFixed(2));
      }
    } else {
      setCalculatedWaterNorm(0);
    }
  }, [gender, weightValue, activeTimeValue]);

  const onSubmit = async (values) => {
    console.log("values", values);
    if (avatarFile) {
      values.avatar = avatarFile;
    } else {
      delete values.avatar;
    }
    console.log(values);
    handleUserSave && handleUserSave(values);
  };

  const handleEditAvatar = (avatarUrl, avatarFile) => {
    setAvatarFile(avatarFile);
    setValue("avatar", avatarUrl);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
        <p className={css.title}>Settings</p>

        <div className={css.imgWrapper}>
          {avatar ? (
            <UserImageElem imgUrl={avatar} altText={name} />
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
            <div className={css.calculateContainer}>
              <p className={clsx(css.boldLabel, css.calcNormaLabel)}>
                My daily norma
              </p>
              <div className={css.calcGenderContainer}>
                <div className={css.calcWomanContainer}>
                  <span className={css.calcGenderLabel}>For woman: </span>
                  <span className={css.calcGenderFormula}>
                    V=(M*0,03) + (T*0,4)
                  </span>
                </div>
                <div className={css.calcManContainer}>
                  <span className={css.calcGenderLabel}>For man: </span>
                  <span className={css.calcGenderFormula}>
                    V=(M*0,04) + (T*0,6)
                  </span>
                </div>
              </div>
              <div className={css.calcNote}>
                <span className={css.calcAsterix}>*</span> V is the volume of
                the water norm in liters per day, M is your body weight, T is
                the time of active sports, or another type of activity
                commensurate in terms of loads (in the absence of these, you
                must set 0){" "}
              </div>
            </div>
            <div className={css.activeTimeContainer}>
              <span>
                <span className={css.sign}>!</span>&nbsp;
                <span className={css.textActiveTime}>Active time in hours</span>
              </span>
            </div>
          </div>

          <div className={css.secondCol}>
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
              name="sportTime"
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
            <div>
              <span>
                <span className={css.textNorma}>
                  The required amount of water in liters per day:
                </span>
                <span className={css.calculatedNorm}>
                  <span>{calculatedWaterNorm} L</span>
                </span>
              </span>
            </div>

            <Controller
              name="waterNorm"
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
        <button type="submit" className={css.btn}>
          Save
        </button>
      </form>
    </FormProvider>
  );
};

export default UserSettingsForm;

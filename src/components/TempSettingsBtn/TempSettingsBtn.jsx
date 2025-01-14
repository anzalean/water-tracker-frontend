import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../Modal/Modal";
import { errNotify, successNotify } from "../../helpers/notification";
import { updateUser, fetchCurrentUser } from "../../redux/user/userOps";
import UserSettingsForm from "../UserSettingsForm/UserSettingsForm";
import {
  selectIsLoggedIn,
  selectUserLoading,
  selectError,
} from "../../redux/user/selectors";
import iconsPath from "../../assets/icons/sprite.svg";
import css from "./TrmpSettingsBtn.module.css";

export default function SettingsBtn({ handleClick = null }) {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isLoading = useSelector(selectUserLoading);
  const error = useSelector(selectError);
  const [showModal, setShowModal] = useState(false);

  const handleButton = async () => {
    if (!isLoggedIn) return;
    try {
      const data = await dispatch(fetchCurrentUser()).unwrap();
      console.log(data);
      successNotify("User data fetched successfully");
      setShowModal(true);
      handleClick && handleClick();
    } catch (error) {
      const errorMessage = error?.message || "Error getting user info";
      errNotify(errorMessage);
    }
  };

  const handleUserUpdate = async (data) => {
    try {
      await dispatch(updateUser(data)).unwrap();
      successNotify("User info updated successfully");
    } catch (error) {
      const errorMessage = error?.message || "Error updating user info";
      errNotify(errorMessage);
    }

    if (!isLoading && !error) {
      setShowModal(false);
    }
  };
  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <React.Fragment>
      <button onClick={handleButton} className={css.button}>
        <span className={css.iconContainer} aria-label="Settings icon">
          <svg className={css.icon}>
            <use href={`${iconsPath}#icon-settings`} />
          </svg>
        </span>
        <span className={css.text}>Setting</span>
      </button>
      {showModal && (
        <Modal onClose={handleClose} isUserForm={true}>
          <UserSettingsForm handleUserSave={handleUserUpdate} />
        </Modal>
      )}
    </React.Fragment>
  );
}

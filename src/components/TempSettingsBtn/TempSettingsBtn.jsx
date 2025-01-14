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

  const handleButton = () => {
    if (isLoggedIn) {
      dispatch(fetchCurrentUser())
        .unwrap()
        .then((data) => {
          console.log(data);
          successNotify("Ok");
          setShowModal(true);
          handleClick && handleClick();
        })
        .catch(() => {
          errNotify("error user info get");
        });
    }
  };
  const handleUserUpdate = (data) => {
    console.log(data);
    dispatch(updateUser(data))
      .unwrap()
      .then(() => {
        successNotify("Ok");
      })
      .catch(() => {
        errNotify("error user info update");
      });

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

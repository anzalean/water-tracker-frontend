import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Modal from "../Modal/Modal";
import { errNotify, successNotify } from "../../helpers/notification";
import { signOut } from "../../redux/user/userOps";
import iconsPath from "../../assets/icons/sprite.svg";
import ModalApproveAction from "../LogoutApprove/LogoutApprove";
import { selectIsLoggedIn } from "../../redux/user/selectors";
import css from "./TempLogOutBtn.module.css";

export default function LogOutBtn({ handleClick }) {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [showModal, setShowModal] = useState(false);

  const handleButton = () => {
    if (isLoggedIn) {
      setShowModal(true);
    }
    if (handleClick) {
      handleClick();
    }
  };

  const handleApprove = () => {
    dispatch(signOut())
      .unwrap()
      .then(() => {
        successNotify("Logout");
      })
      .catch(() => {
        errNotify("Error logout");
      });
    setShowModal(false);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <React.Fragment>
      <button onClick={handleButton} className={css.button}>
        <span className={css.iconContainer} aria-label="Log out icon">
          <svg className={css.icon}>
            <use href={`${iconsPath}#icon-log-out`} />
          </svg>
        </span>
        <span className={css.text}>Log out</span>
      </button>
      {showModal && (
        <Modal onClose={handleClose}>
          <ModalApproveAction
            onCancel={handleClose}
            onApprove={handleApprove}
            message="Are you living?"
          />
        </Modal>
      )}
    </React.Fragment>
  );
}

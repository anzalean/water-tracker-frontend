import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";
import {
  selectIsLoggedIn,
  selectUserName,
  selectUserAvatar,
} from "../../redux/user/selectors";
import { errNotify, successNotify } from "../../helpers/notification";
import {
  updateUser,
  signOut,
  fetchCurrentUser,
} from "../../redux/user/userOps";
import iconsPath from "../../assets/icons/sprite.svg";
import UserIconElem from "../UserIconElem/UserIconElem";
import UserImageElem from "../UserImageElem/UserImageElem";
import Modal from "../Modal/Modal";
import UserSettingsForm from "../UserSettingsForm/UserSettingsForm";
import LogoutApprove from "../LogoutApprove/LogoutApprove";

import css from "./UserBar.module.css";

export default function UserBar() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const userName = useSelector(selectUserName);
  const userAvatar = useSelector(selectUserAvatar);

  const [showPopover, setShowPopover] = useState(false);
  const [showUserForm, setShowUserForm] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const popoverRef = useRef(null);

  useEffect(() => {
    if (showPopover) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showPopover]);

  const handleClickOutside = (event) => {
    if (popoverRef.current && !popoverRef.current.contains(event.target)) {
      setShowPopover(false);
    }
  };

  if (!isLoggedIn) return null;

  const togglePopover = (event) => {
    event.stopPropagation();
    setShowPopover((prev) => !prev);
  };

  const handleSettingsButton = () => {
    document.body.style.overflow = "hidden";
    if (isLoggedIn) {
      dispatch(fetchCurrentUser())
        .unwrap()
        .then(() => {
          successNotify("Successfully fetched user information.");
          setShowPopover(false);
          setShowUserForm(true);
        })
        .catch(() => {
          errNotify("Failed to fetch user information.");
        });
    }
  };

  const handleUserForm = (data) => {
    document.body.style.overflow = "auto";
    dispatch(updateUser(data))
      .unwrap()
      .then(() => {
        successNotify("Settings updated successfully.");
        setShowUserForm(false);
      })
      .catch(() => {
        errNotify("Failed to update settings.");
      });
  };

  const handleLogoutButton = () => {
    document.body.style.overflow = "hidden";
    setShowPopover(false);
    setShowLogoutModal(true);
  };

  const handleLogoutApprove = () => {
    document.body.style.overflow = "auto";
    dispatch(signOut())
      .unwrap()
      .then(() => {
        successNotify("You have successfully logged out.");
      })
      .catch(() => {
        errNotify("An error occurred during logout. Please try again.");
      })
      .finally(() => {
        setShowLogoutModal(false);
      });
  };

  return (
    <div className={css.userBarContainer}>
      <button
        className={clsx(css.userBarBtn, showPopover && css.open)}
        onClick={togglePopover}
      >
        <span className={css.contentBtn}>
          <span className={css.userName}>{userName}</span>
          {userAvatar ? (
            <UserImageElem
              imgUrl={userAvatar}
              altText={userName}
              isSmall={true}
            />
          ) : (
            <UserIconElem isSmall={true} />
          )}
          <span className={css.iconChevronContainer}>
            <svg className={css.iconChevron}>
              <use href={`${iconsPath}#icon-chevron-down`} />
            </svg>
          </span>
        </span>
      </button>

      {showPopover && (
        <div ref={popoverRef} className={css.popover}>
          <button
            onClick={handleSettingsButton}
            className={clsx(css.popoverItem, showUserForm && css.active)}
          >
            <svg className={css.icon} width="16" height="16">
              <use href={`${iconsPath}#icon-settings`} />
            </svg>
            <span>Settings</span>
          </button>
          <button
            onClick={handleLogoutButton}
            className={clsx(css.popoverItem, showLogoutModal && css.active)}
          >
            <svg className={css.icon}>
              <use href={`${iconsPath}#icon-log-out`} />
            </svg>
            <span>
              <span> Log out</span>
            </span>
          </button>
        </div>
      )}

      {showUserForm && (

        <Modal onClose={() => { setShowUserForm(false); document.body.style.overflow = "auto"; }}  isUserForm={true} className={css.modal}>

          <UserSettingsForm handleUserSave={handleUserForm} />
        </Modal>
      )}
      {showLogoutModal && (
        <Modal onClose={() => { setShowLogoutModal(false); document.body.style.overflow = "auto"; }}>
          <LogoutApprove
            onCancel={() => { setShowLogoutModal(false); document.body.style.overflow = "auto"; }}
            onApprove={handleLogoutApprove}
          />
        </Modal>
      )}
    </div>
  );
}

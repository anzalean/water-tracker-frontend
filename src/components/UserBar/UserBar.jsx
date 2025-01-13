import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";
import {
  selectIsLoggedIn,
  selectIsLoading,
  selectError,
  selectUserName,
  selectUserAvatar,
} from "../../redux/user/selectors";
import { errNotify, successNotify } from "../../helpers/notification";
import { updateUserInfo, signOut, getUserInfo } from "../../redux/user/userOps";
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
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
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
    console.log("Клік за межами:", event.target);
    console.log("Посилання на поповер:", popoverRef.current);

    if (popoverRef.current && !popoverRef.current.contains(event.target)) {
      console.log("Закриваємо поповер");
      setShowPopover(false);
    }
  };

  if (!isLoggedIn) return null;

  const togglePopover = (event) => {
    event.stopPropagation();
    setShowPopover((prev) => !prev);
  };

  const handleSettingsButton = () => {
    if (isLoggedIn) {
      dispatch(getUserInfo())
        .unwrap()
        .then(() => {
          successNotify("Ok");
          setShowUserForm(true);
        })
        .catch(() => {
          errNotify("Error fetching user info");
        });
    }
  };

  const handleUserForm = (data) => {
    dispatch(updateUserInfo(data))
      .unwrap()
      .then(() => {
        successNotify("Profile updated");
      })
      .catch(() => {
        errNotify("Error updating profile");
      });

    if (!isLoading && !error) {
      setShowUserForm(false);
    }
  };

  const handleLogoutButton = () => {
    setShowLogoutModal(true);
  };

  const handleLogoutApprove = () => {
    dispatch(signOut())
      .unwrap()
      .then(() => {
        successNotify("Logged out");
      })
      .catch(() => {
        errNotify("Error during logout");
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
            <svg className={css.icon}>
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
        <Modal onClose={() => setShowUserForm(false)}>
          <UserSettingsForm handleUserSave={handleUserForm} />
        </Modal>
      )}
      {showLogoutModal && (
        <Modal onClose={() => setShowLogoutModal(false)}>
          <LogoutApprove
            onCancel={() => setShowLogoutModal(false)}
            onApprove={handleLogoutApprove}
          />
        </Modal>
      )}
    </div>
  );
}

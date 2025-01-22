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
import { useTour } from "@reactour/tour";
import css from "./UserBar.module.css";
import { useTranslation } from "react-i18next";

export default function UserBar() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const userName = useSelector(selectUserName);
  const userAvatar = useSelector(selectUserAvatar);
  const { t } = useTranslation();

  const { currentStep, steps, setCurrentStep } = useTour();

  const [showPopover, setShowPopover] = useState(false);
  const [showUserForm, setShowUserForm] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isTourActive, setIsTourActive] = useState(false);

  const popoverRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      event.stopPropagation();
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target) &&
        !isTourActive
      ) {
        setShowPopover(false);
      }
    };
    if (showPopover && !isTourActive) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showPopover, isTourActive]);

  useEffect(() => {
    const handleTourChange = () => {
      const currentStepData = steps[currentStep];

      if (currentStepData?.selector === '[data-tour="step-profile"]') {
        setShowPopover(true);
        setIsTourActive(true);
      } else if (
        currentStepData?.selector === '[data-tour="step-settings"]' ||
        currentStepData?.selector === '[data-tour="step-logout"]'
      ) {
        if (isTourActive) {
          setShowPopover(true);
        } else {
          setCurrentStep(
            steps.findIndex(
              (step) => step.selector === '[data-tour="step-profile"]'
            )
          );
        }
      } else {
        setShowPopover(false);
        setIsTourActive(false);
      }
    };

    handleTourChange();
  }, [currentStep, steps, isTourActive, setCurrentStep]);

  if (!isLoggedIn) return null;

  const truncateName = (name) => {
    return name.length > 10 ? `${name.slice(0, 10)}...` : name;
  };

  const togglePopover = (event) => {
    event.stopPropagation();
    setShowPopover((prev) => !prev);
  };

  const handleSettingsButton = () => {
    event.stopPropagation();
    document.body.style.overflow = "hidden";
    if (isLoggedIn) {
      dispatch(fetchCurrentUser())
        .unwrap()
        .then(() => {
          successNotify(t("toast.fetchUserSuccess"));
          setShowPopover(false);
          setShowUserForm(true);
        })
        .catch(() => {
          errNotify(t("toast.fetchUserError"));
        });
    }
  };

  const handleUserForm = (data) => {
    document.body.style.overflow = "auto";
    dispatch(updateUser(data))
      .unwrap()
      .then(() => {
        successNotify("toast.settingsUpdateSuccess");
        setShowUserForm(false);
      })
      .catch(() => {
        errNotify("toast.settingsUpdateError");
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
        successNotify("toast.logoutSuccess");
      })
      .catch(() => {
        errNotify("toast.logoutError");
      })
      .finally(() => {
        setShowLogoutModal(false);
      });
  };

  return (
    <div className={css.userBarContainer}>
      <button
        data-tour="step-profile"
        className={clsx(css.userBarBtn, showPopover && css.open)}
        onClick={togglePopover}
      >
        <span className={css.contentBtn}>
          <span className={css.userName}>{truncateName(userName)}</span>
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
            data-tour="step-settings"
            onClick={handleSettingsButton}
            className={clsx(css.popoverItem, showUserForm && css.active)}
          >
            <svg className={css.icon} width="16" height="16">
              <use href={`${iconsPath}#icon-settings`} />
            </svg>
            <span>{t("Userbar.setting")}</span>
          </button>
          <button
            data-tour="step-logout"
            onClick={handleLogoutButton}
            className={clsx(css.popoverItem, showLogoutModal && css.active)}
          >
            <svg className={css.icon}>
              <use href={`${iconsPath}#icon-log-out`} />
            </svg>
            <span>{t("Userbar.logOut")}</span>
          </button>
        </div>
      )}

      {showUserForm && (
        <Modal
          onClose={() => {
            setShowUserForm(false);
            document.body.style.overflow = "auto";
          }}
          isUserForm={true}
          className={css.modal}
        >
          <UserSettingsForm handleUserSave={handleUserForm} />
        </Modal>
      )}
      {showLogoutModal && (
        <Modal
          onClose={() => {
            setShowLogoutModal(false);
            document.body.style.overflow = "auto";
          }}
        >
          <LogoutApprove
            onCancel={() => {
              setShowLogoutModal(false);
              document.body.style.overflow = "auto";
            }}
            onApprove={handleLogoutApprove}
          />
        </Modal>
      )}
    </div>
  );
}

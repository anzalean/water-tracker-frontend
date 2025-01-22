import React from "react";
import { useDispatch } from "react-redux";

import { FcGoogle } from "react-icons/fc";
import { fetchOAuthUrl } from "../../redux/user/userOps";
import s from "./GoogleButton.module.css";
import { useTranslation } from "react-i18next";

export default function GoogleButton({ text = "googleButton.googleInBtn" }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const googleLoginClick = () => {
    dispatch(fetchOAuthUrl())
      .unwrap()
      .then((response) => {
        // console.log("OAuth URL fetched successfully:", response.data.url);
        if (response.data.url) window.location.assign(response.data.url);
      })
      .catch((error) => {
        console.error("Failed to fetch OAuth URL:", error.message || error);
      });
  };

  return (
    <React.Fragment>
      <button
        type="button"
        onClick={googleLoginClick}
        className={s.googleButton}
      >
        <FcGoogle className={s.googleIcon} />
        <span className={s.googleText}>{t(text)}</span>
      </button>
    </React.Fragment>
  );
}

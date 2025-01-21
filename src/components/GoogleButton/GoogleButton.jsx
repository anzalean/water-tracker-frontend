import React from "react";
import { useDispatch } from "react-redux";

import { FcGoogle } from "react-icons/fc";
import { fetchOAuthUrl } from "../../redux/user/userOps";
import s from "./GoogleButton.module.css";

export default function GoogleButton() {
  const dispatch = useDispatch();
  const googleLoginClick = () => {
    dispatch(fetchOAuthUrl())
      .unwrap()
      .then((response) => {
        console.log("OAuth URL fetched successfully:", response.data.url);
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
        <span className={s.googleText}>Sign in with Google</span>
      </button>
    </React.Fragment>
  );
}

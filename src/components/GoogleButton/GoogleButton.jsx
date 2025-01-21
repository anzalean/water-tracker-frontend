import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { selectOAuthUrl } from "../../redux/user/selectors";
import { FcGoogle } from "react-icons/fc";
import { fetchOAuthUrl, googleLogin } from "../../redux/user/userOps";
import s from "./GoogleButton.module.css";

export default function GoogleButton() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const oAuthUrl = useSelector(selectOAuthUrl);
  console.log(oAuthUrl);

  const googleLoginClick = () => {
    dispatch(fetchOAuthUrl())
      .unwrap()
      .then((response) => {
        console.log("OAuth URL fetched successfully:", response.data.url);
        if (oAuthUrl) window.location.assign(oAuthUrl);
      })
      .catch((error) => {
        console.error("Failed to fetch OAuth URL:", error.message || error);
      });
  };

  // useEffect(() => {
  //   if (code) {
  //     dispatch(googleLogin({ code }))
  //       .unwrap()
  //       .then(() => {
  //         console.log("Google login successful");
  //       })
  //       .catch((error) => {
  //         console.error("Google login failed:", error.message || error);
  //       });
  //   }
  // }, [dispatch, code]);

  useEffect(() => {
    const code = new URLSearchParams(location.search).get("code");

    if (code) {
      dispatch(googleLogin({ code }))
        .unwrap()
        .then(() => {
          console.log("Google login successful");
          navigate("/tracker");
        })
        .catch((error) => {
          console.error("Google login failed:", error.message || error);
        });
    } else {
      console.error("Authorization code is missing");
    }
  }, [dispatch, location, navigate]);

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
      {oAuthUrl && (
        <a href={oAuthUrl} className={s.linkGoogle}>
          Continue with Google
        </a>
      )}
    </React.Fragment>
  );
}

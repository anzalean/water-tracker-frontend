import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { errNotify, successNotify } from "../../helpers/notification";
import { useNavigate } from "react-router-dom";
import { signUp, signIn } from "../../redux/user/userOps";
import iconsPath from "../../assets/icons/sprite.svg";
import { selectIsLoggedIn, selectError } from "../../redux/user/selectors";
import css from "./TempRegisterBtn.module.css";

const values = {
  email: "testqqq@gmail.com",
  password: "testqqq@gmail.com",
};

export default function TempRegisterBtn({ handleClick }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const savedError = useSelector(selectError);

  const handleButton = async (values) => {
    if (isLoggedIn) return;
    try {
      await dispatch(signUp(values)).unwrap();
      successNotify("Successfully registered!");
      await dispatch(signIn(values)).unwrap();
      successNotify("Successfully logged in!");

      navigate("/tracker");
    } catch (error) {
      errNotify(error.message || "An error occurred.");
    }
    if (handleClick) {
      handleClick();
    }
  };

  useEffect(() => {
    if (savedError) {
      errNotify(savedError);
    }
  }, [savedError]);

  return (
    <React.Fragment>
      <button onClick={() => handleButton(values)} className={css.button}>
        <span className={css.iconContainer} aria-label="Log in icon">
          <svg className={css.icon}>
            <use href={`${iconsPath}#icon-log-out`} />
          </svg>
        </span>
        <span className={css.text}>Register</span>
      </button>
    </React.Fragment>
  );
}

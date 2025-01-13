import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { errNotify, successNotify } from "../../helpers/notification";
import { useNavigate } from "react-router-dom";
import { signIn } from "../../redux/user/userOps";

import iconsPath from "../../assets/icons/sprite.svg";
import { selectIsLoggedIn } from "../../redux/user/selectors";
import css from "./TempLogInBtn.module.css";

export default function LogInBtn({ handleClick }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const handleButton = () => {
    if (!isLoggedIn) {
      dispatch(
        signIn({
          email: "andrea.alexandrov1@gmail.com",
          password: "andrea.alexandrov1@gmail.com",
        })
      )
        .unwrap()
        .then((data) => {
          console.log(data);
          successNotify("Ok");
          navigate("/tracker");
        })
        .catch((error) => {
          console.error(error.message);
          errNotify(error.message);
        });
    }

    if (handleClick) {
      handleClick();
    }
  };

  return (
    <React.Fragment>
      <button onClick={handleButton} className={css.button}>
        <span className={css.iconContainer} aria-label="Log in icon">
          <svg className={css.icon}>
            <use href={`${iconsPath}#icon-log-out`} />
          </svg>
        </span>
        <span className={css.text}>Log in</span>
      </button>
    </React.Fragment>
  );
}

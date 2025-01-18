import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { errNotify, successNotify } from "../../helpers/notification";
import { useNavigate } from "react-router-dom";
import { signIn } from "../../redux/user/userOps";
import iconsPath from "../../assets/icons/sprite.svg";
import { selectError } from "../../redux/user/selectors";
import css from "./TempLogInBtn.module.css";

export default function LogInBtn({ handleClick }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const savedError = useSelector(selectError);

  const values = {
    email: "testAndre@gmail.com",
    password: "testAndre@gmail.com",
  };

  const handleButton = async (values) => {
    try {
      const signInData = await dispatch(signIn(values)).unwrap();
      console.log(signInData);
      successNotify("Ok");
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
        <span className={css.text}>Log in</span>
      </button>
    </React.Fragment>
  );
}

// {
//     "status": 200,
//     "message": "Successfully logged in an user!",
//     "data": {
//         "user": {
//             "userId": "67863ff9e5607435d78d5555",
//             "email": "testAndre@gmail.com",
//             "name": "testAndre",
//             "gender": "female",
//             "avatarURL": "https://res.cloudinary.com/dhufqulj5/image/upload/v1736796700/pvtpcewd72z3ixrwjo7n.png",
//             "desiredVolume": 1500,
//             "weight": 0,
//             "activityTime": 0
//         },
//         "accessToken": "xzhFDqlfTkGAgdIRfrcPwvp6lUzrN8z7vK9XDvyO"
//     }
// }

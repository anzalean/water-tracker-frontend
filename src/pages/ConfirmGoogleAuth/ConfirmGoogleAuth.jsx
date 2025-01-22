import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { googleLogin } from "../../redux/user/userOps";
import { useNavigate } from "react-router-dom";

export default function ConfirmGoogleAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const code = queryParams.get("code");

    if (code) {
      dispatch(googleLogin({ code }))
        .unwrap()
        // eslint-disable-next-line no-unused-vars
        .then((response) => {
          // console.log(response);
          // console.log("Google login successful");
          navigate("/tracker");
        })
        .catch((error) => {
          console.error("Google login failed:", error.message || error);
        });
    }
  }, [dispatch, navigate]);

  return <></>;
}

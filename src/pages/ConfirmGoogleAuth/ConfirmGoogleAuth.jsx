import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { googleLogin } from "../../redux/user/userOps";
import Loader from "../../components/Loader/Loader";
import { useNavigate } from "react-router-dom";
// import { useLocation } from "react-router-dom";

const ConfirmGoogleAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //   const location = useLocation();

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get("code");

    if (code) {
      dispatch(googleLogin({ code }))
        .then(() => {
          navigate("/tracker");
        })
        .catch((error) => {
          console.error("Google login failed", error);
        });
    } else {
      console.error("No code received from Google");
    }
  }, [dispatch, navigate]);

  return <Loader />;
};

export default ConfirmGoogleAuth;

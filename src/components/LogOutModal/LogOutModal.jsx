import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/selectors";
import Modal from "../Modal/Modal";
import css from "./LogOutModal.module.css";

const LogOutModal = ({ onClose }) => {
    console.log('LogOutModal is rendering');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    try {
      await dispatch(logout());
      navigate("/");
      onClose();
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <Modal onClose={onClose}>
      <div className={css.logOutContent}>
        <h2 className={css.logOutTitle}>Log out</h2>
        <p className={css.logOutCaption}>Do you really want to leave?</p>
        <div className={css.logOutBtnCont}>
          <button className={css.logButton} onClick={handleLogOut}>
            Log out
          </button>
          <button className={css.cancelButton} onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default LogOutModal;

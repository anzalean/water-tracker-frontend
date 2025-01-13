import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Modal from "../Modal/Modal";
import css from "./LogOutModal.module.css";
import { signOut } from "../../redux/user/userOps";

const LogOutModal = ({ onClose }) => {
  console.log("LogOutModal is rendering");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    try {
      await dispatch(signOut());
      navigate("/");
      onClose();
    } catch (error) {
      console.error("Error during sign out:", error);
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

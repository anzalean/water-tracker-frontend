import { useDispatch } from "react-redux";
import { deleteWater } from "../../redux/water/waterOps";
import css from "./DeleteWaterModal.module.css";
import toast from "react-hot-toast";
import Modal from "../Modal/Modal";

export const DeleteWaterModal = ({ onRequestClose }) => {
  const dispatch = useDispatch();

  const onDelete = async () => {
    try {
      await dispatch(deleteWater(_id)).unwrap();
      toast.success("The data on the amount of water consumed has been successfully deleted");
      onRequestClose();
    } catch (error) {
      toast.error("Something went wrong. Please try again later.");
      console.error("Error during delete:", error);
    }
  };

  return (
    <Modal onClose={onRequestClose}>
      <div className={css.deleteWaterContent}>
        <h2 className={css.deleteWaterTitle}>Delete Entry</h2>
        <p className={css.deleteWaterCaption}>Are you sure you want to delete this entry?</p>
        <div className={css.deleteBtnCont}>
          <button className={css.deleteButton} onClick={onDelete}>
            Delete
          </button>
          <button className={css.cancelButton} onClick={onRequestClose}>
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

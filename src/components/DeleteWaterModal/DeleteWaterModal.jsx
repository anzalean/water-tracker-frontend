import Modal from "../Modal/Modal.jsx";
import { useDispatch } from "react-redux";
import { deleteWater } from "../../redux/water/waterOps.js";
import { errNotify, successNotify } from "../../helpers/notification.js";
import { DeleteWaterApprove } from "../DeleteWaterApprove/DeleteWaterApprove";

export default function DeleteWaterModal({ onClose, waterId }) {
  const dispatch = useDispatch();
  const onApprove = () => {
    dispatch(deleteWater(waterId))
      .unwrap()
      .then(() => {
        successNotify("Success to delete water data.");
      })
      .catch((error) => {
        errNotify("Failed to delete water data.");
        console.error(error.message);
      });
    onClose();
  };
  return (
    <div>
      <Modal onClose={onClose}>
        <DeleteWaterApprove onCancel={onClose} onApprove={onApprove} />
      </Modal>
    </div>
  );
}

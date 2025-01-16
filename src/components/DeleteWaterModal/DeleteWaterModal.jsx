import Modal from "../Modal/Modal.jsx";
// import { useDispatch } from "react-redux";
// import { deleteWater } from "../../redux/water/waterOps.js";
import { DeleteWaterApprove } from "../DeleteWaterApprove/DeleteWaterApprove";

export default function DeleteWaterModal({ onClose, waterId }) {
  // const dispatch = useDispatch()
  const onApprove = () => {
    console.log("Delete", waterId);
    // dispatch(deleteWater({ warterId: waterId }));
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

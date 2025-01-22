import Modal from "../Modal/Modal.jsx";
import { useDispatch } from "react-redux";
import { deleteWater } from "../../redux/water/waterOps.js";
import { errNotify, successNotify } from "../../helpers/notification.js";
import { DeleteWaterApprove } from "../DeleteWaterApprove/DeleteWaterApprove";
import { useTranslation } from "react-i18next";

export default function DeleteWaterModal({ onClose, waterId }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const onApprove = () => {
    dispatch(deleteWater(waterId))
      .unwrap()
      .then(() => {
        successNotify(t("toast.deleteWaterSuccess"));
      })
      .catch(() => {
        errNotify(t("toast.deleteWaterError"));
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

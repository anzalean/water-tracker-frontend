import Modal from "../Modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import { selectWaterDate } from "../../redux/water/selectors";
import { WaterModal } from "../WaterModal/WaterModal";
import { replaceTimeInDate } from "../../helpers/replaceTimeInDate";
import { addWater } from "../../redux/water/waterOps";
import { errNotify, successNotify } from "../../helpers/notification";
import { useTranslation } from "react-i18next";

export default function AddWaterModal({ onClose }) {
  const dispatch = useDispatch();
  const currentDate = useSelector(selectWaterDate);
  const { t } = useTranslation();

  const onSubmitForm = (values) => {
    const date = replaceTimeInDate(currentDate, values.time);
    // console.log({ date, amount: values.inputField });
    dispatch(addWater({ date, amount: values.inputField }))
      .unwrap()
      .then(() => {
        successNotify(t("toast.addWaterSuccess"));
        onClose();
      })
      .catch(() => {
        errNotify(t("toast.addWaterError"));
      });
  };

  return (
    <div>
      <Modal onClose={onClose}>
        <WaterModal
          title={t("modals.addEdit.btn")}
          subtitle={t("modals.addEdit.choose")}
          onSave={onSubmitForm}
        />
      </Modal>
    </div>
  );
}

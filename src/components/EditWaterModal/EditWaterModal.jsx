import Modal from "../Modal/Modal.jsx";
import { WaterModal } from "../WaterModal/WaterModal.jsx";
import { useDispatch, useSelector } from "react-redux";
import { selectWaterDate } from "../../redux/water/selectors";
import { updateWater } from "../../redux/water/waterOps.js";
import { replaceTimeInDate } from "../../helpers/replaceTimeInDate.js";
import { successNotify, errNotify } from "../../helpers/notification.js";
import { extractTimeFromDateString } from "../../helpers/extractTimeFromDateString.js";
import { useTranslation } from "react-i18next";

export default function EditWaterModal({ onClose, waterCard }) {
  const currentDate = useSelector(selectWaterDate);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const onSubmitForm = (values) => {
    const date = replaceTimeInDate(currentDate, values.time);
    // console.log("Date", date);
    dispatch(
      updateWater({
        cardId: waterCard._id,
        waterData: { date, amount: values.inputField },
      })
    )
      .unwrap()
      .then(() => {
        successNotify(t("toast.editWaterSuccess"));
        onClose();
      })
      .catch((error) => {
        errNotify(t("toast.editWaterError", { message: error.message }));
      });
  };

  return (
    <div>
      <Modal onClose={onClose}>
        <WaterModal
          title={t("modals.addEdit.edit")}
          subtitle={t("modals.addEdit.correct")}
          correct
          onSave={onSubmitForm}
          initialData={{
            time: extractTimeFromDateString(waterCard.date),
            amount: waterCard.amount,
          }}
        />
      </Modal>
    </div>
  );
}

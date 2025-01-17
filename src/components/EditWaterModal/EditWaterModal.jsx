import Modal from "../Modal/Modal.jsx";
import { WaterModal } from "../WaterModal/WaterModal.jsx";
import { useDispatch, useSelector } from "react-redux";
import { selectWaterDate } from "../../redux/water/selectors";
import { updateWater } from "../../redux/water/waterOps.js";
import { replaceTimeInDate } from "../../helpers/replaceTimeInDate.js";
import { successNotify, errNotify } from "../../helpers/notification.js";
import { extractTimeFromDateString } from "../../helpers/extractTimeFromDateString.js";

export default function EditWaterModal({ onClose, waterCard }) {
  const currentDate = useSelector(selectWaterDate);
  const dispatch = useDispatch();

  const onSubmitForm = (values) => {
    const date = replaceTimeInDate(currentDate, values.time);
    console.log("Date", date);
    dispatch(
      updateWater({
        cardId: waterCard._id,
        waterData: { date, amount: values.inputField },
      })
    )
      .unwrap()
      .then(() => {
        successNotify("Added water successfully!");
        onClose();
      })
      .catch((error) => {
        errNotify(`Error: ${error.message}`);
      });
  };

  return (
    <div>
      <Modal onClose={onClose}>
        <WaterModal
          title="Edit the entered amount of water"
          subtitle="Correct entered data:"
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

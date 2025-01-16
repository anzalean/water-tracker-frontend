import Modal from "../Modal/Modal.jsx";
import { WaterModal } from "../WaterModal/WaterModal.jsx";
// import { useDispatch } from "react-redux";
// import { updateWater } from "../../redux/water/waterOps.js";
import { extractTimeFromDateString } from "../../helpers/extractTimeFromDateString.js";

export default function EditWaterModal({ onClose, waterCard }) {
  // const dispatch = useDispatch();

  const onSubmitForm = (values) => {
    console.log("Added:", values);
    // dispatch(updateWater({ warterId: waterCard._id, values }));
    onClose();
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

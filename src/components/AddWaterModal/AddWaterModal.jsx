import Modal from "../Modal/Modal";
import { WaterModal } from "../WaterModal/WaterModal";
import { addWater } from "../../redux/water/waterOps";
import { useDispatch } from "react-redux";
import { errNotify, successNotify } from "../../helpers/notification";

export default function AddWaterModal({ onClose }) {
  const dispatch = useDispatch();

  const onSubmitForm = (values) => {
    dispatch(addWater(values))
      .unwrap()
      .then((result) => {
        console.log(result);
        successNotify("Successfully added water!");
      })
      .catch((error) => {
        errNotify(`Error: ${error.message}`);
      });

    onClose();
  };

  return (
    <div>
      <Modal onClose={onClose}>
        <WaterModal
          title="Add water"
          subtitle="Choose a value:"
          onSave={onSubmitForm}
        />
      </Modal>
    </div>
  );
}

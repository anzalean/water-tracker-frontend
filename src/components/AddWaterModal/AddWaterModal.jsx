import Modal from "../Modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import { selectWaterDate } from "../../redux/water/selectors";
import { WaterModal } from "../WaterModal/WaterModal";
import { replaceTimeInDate } from "../../helpers/replaceTimeInDate";
import { addWater } from "../../redux/water/waterOps";
import { errNotify, successNotify } from "../../helpers/notification";

export default function AddWaterModal({ onClose }) {
  const dispatch = useDispatch();
  const currentDate = useSelector(selectWaterDate);

  const onSubmitForm = (values) => {
    const date = replaceTimeInDate(currentDate, values.time);
    // console.log({ date, amount: values.inputField });
    dispatch(addWater({ date, amount: values.inputField }))
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
          title="Add water"
          subtitle="Choose a value:"
          onSave={onSubmitForm}
        />
      </Modal>
    </div>
  );
}

import { useState } from "react";
import { useDispatch } from "react-redux";
import iconsPath from "../../assets/icons/sprite.svg";
import { extractTimeFromDateString } from "../../helpers/extractTimeFromDateString";
import EditCardModal from "../EditWaterModal/EditWaterModal";
import { deleteWater } from "../../redux/water/waterOps";
import css from "./WaterCard.module.css";

export default function WaterCard({ waterCard }) {
  const { _id, amount, date } = waterCard || {};

  console.log("WaterCard", waterCard);

  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleDelete = () => {
    if (_id) {
      console.log("Deleted water card with ID:", _id);
      dispatch(deleteWater(_id));
    }
  };

  const handleEdit = () => {
    openModal();
  };

  const timeString = date ? extractTimeFromDateString(date) : "--:--";

  return (
    <div className={css.waterCard} id={`card-${_id}`}>
      <div className={css.iconGlassContainer}>
        <svg className={css.iconGlass} aria-label="Water glass icon">
          <use href={`${iconsPath}#icon-water-glass-green`} />
        </svg>
      </div>

      <div className={css.cardInfo}>
        <span className={css.volume}>{amount || 0} ml</span>
        <span className={css.time}>{timeString}</span>
      </div>

      <div className={css.actions}>
        <span
          className={css.iconContainer}
          aria-label="Edit water card"
          onClick={handleEdit}
        >
          <svg className={css.icon}>
            <use href={`${iconsPath}#icon-edit`} />
          </svg>
        </span>
        <span
          className={css.iconContainer}
          aria-label="Delete water card"
          onClick={handleDelete}
        >
          <svg className={css.icon}>
            <use href={`${iconsPath}#icon-trash`} />
          </svg>
        </span>
      </div>
      {modalOpen && (
        <div>
          <EditCardModal onClose={closeModal} waterCard={waterCard} />
        </div>
      )}
    </div>
  );
}

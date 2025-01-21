import { useState } from "react";
import iconsPath from "../../assets/icons/sprite.svg";
import { extractTimeFromDateString } from "../../helpers/extractTimeFromDateString";
import EditCardModal from "../EditWaterModal/EditWaterModal";
import DeleteWaterModal from "../DeleteWaterModal/DeleteWaterModal";
import css from "./WaterCard.module.css";
import { useTranslation } from "react-i18next";

export default function WaterCard({waterCard}) {
  const { _id, amount, date } = waterCard || {};
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalForDelete, setModalForDelete] = useState(false);
  const { t } = useTranslation();

  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };
  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto";
  };

  const handleDelete = () => {
    setModalForDelete(true);
    openModal();
  };

  const handleEdit = () => {
    setModalForDelete(false);
    openModal();
  };

  const timeString = date ? extractTimeFromDateString(date) : "--:--";

  return (
    <div className={css.waterCard}>
      <div className={css.iconGlassContainer}>
        <svg className={css.iconGlass} aria-label="Water glass icon">
          <use href={`${iconsPath}#icon-water-glass-green`} />
        </svg>
      </div>

      <div className={css.cardInfo}>
        <span className={css.volume}>
          {amount || 0} {t("dailyInfo.ml")}
        </span>
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

      {isModalOpen && !modalForDelete && (
        <EditCardModal onClose={closeModal} waterCard={waterCard} />
      )}
      {isModalOpen && modalForDelete && (
        <DeleteWaterModal onClose={closeModal} waterId={_id} />
      )}
    </div>
  );
}

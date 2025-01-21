import { useState } from "react";
import iconsPath from "../../assets/icons/sprite.svg";
import { extractTimeFromDateString } from "../../helpers/extractTimeFromDateString";
import EditCardModal from "../EditWaterModal/EditWaterModal";
import DeleteWaterModal from "../DeleteWaterModal/DeleteWaterModal";
// import { useTour } from "@reactour/tour"
import css from "./WaterCard.module.css";
import { useTranslation } from "react-i18next";

export default function WaterCard({
  waterCard,
  // isTourActive
}) {
  const { _id, amount, date } = waterCard || {};
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalForDelete, setModalForDelete] = useState(false);
  const { t } = useTranslation();
  // const { currentStep, steps, setCurrentStep } = useTour();

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
    <div
      // data-tour={isTourActive && waterCard ? "step-portion" : undefined}
      data-tour="step-portion"
      className={css.waterCard}
    >
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
          data-tour="step-edit-card"
          // data-tour={isTourActive && waterCard ? "step-edit-card" : undefined}
          className={css.iconContainer}
          aria-label="Edit water card"
          onClick={handleEdit}
        >
          <svg className={css.icon}>
            <use href={`${iconsPath}#icon-edit`} />
          </svg>
        </span>
        <span
          data-tour="step-delete-card"
          // data-tour={isTourActive && waterCard ? "step-delete-card" : undefined}
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

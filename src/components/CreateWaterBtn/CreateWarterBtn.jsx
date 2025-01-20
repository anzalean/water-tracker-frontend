import React, { useState } from "react";
import iconsPath from "../../assets/icons/sprite.svg";
import AddWaterModal from "../AddWaterModal/AddWaterModal";
import css from "./CreateWaterBtn.module.css";
import { useDispatch } from "react-redux";
import { addWater } from "../../redux/water/waterOps";
import { useTranslation } from "react-i18next";

const CreateWaterBtn = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto";
  };

  const handleCreate = () => {
    openModal();
  };

  const handleAddWater = (amount) => {
    dispatch(addWater({ amount }));
    closeModal();
  };

  return (
    <React.Fragment>
      <button
        type="button"
        className={css.btn}
        onClick={handleCreate}
        aria-label="Add water"
      >
        <span className={css.iconContainer}>
          <svg className={css.icon}>
            <use href={`${iconsPath}#icon-plus`} />
          </svg>
        </span>
        <span className={css.text}>{t("modals.addEdit.btn")}</span>
      </button>
      {isModalOpen && (
        <AddWaterModal onClose={closeModal} onAdd={handleAddWater} />
      )}
    </React.Fragment>
  );
};

export default CreateWaterBtn;

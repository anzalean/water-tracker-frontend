import React, { useState } from "react";
import iconsPath from "../../assets/icons/sprite.svg";
import styles from "./AddWaterButton.module.css";
import AddWaterModal from "../AddWaterModal/AddWaterModal";
import { useDispatch } from "react-redux";
import { addWater } from "../../redux/water/waterOps";

const AddWaterButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

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
      <button data-tour="step-add-card" className={styles.buttonContainer} onClick={handleCreate}>
        <svg className={styles.buttonIcon} width="30" height="30">
          <use href={`${iconsPath}#icon-plus`} />
        </svg>
        <span className={styles.buttonText}>Add water</span>
      </button>

      {isModalOpen && (
        <AddWaterModal onClose={closeModal} onAdd={handleAddWater} />
      )}
    </React.Fragment>
  );
};

export default AddWaterButton;

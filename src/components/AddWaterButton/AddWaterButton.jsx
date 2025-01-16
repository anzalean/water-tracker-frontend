import React, { useState } from "react";
import styles from "./AddWaterButton.module.css";
import AddWaterModal from "../AddWaterModal/AddWaterModal";

const AddWaterButton = ({ variant = "default" }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleCreate = () => {
    openModal();
  };

  return (
    <React.Fragment>
      <button
        className={`${styles.buttonContainer} ${
          variant === "dailyInfo" ? styles.dailyInfoVariant : ""
        }`}
        onClick={handleCreate}
      >
        <svg
          className={`${styles.buttonIcon} ${
            variant === "dailyInfo" ? styles.dailyInfoIcon : ""
          }`}
          width="30"
          height="30"
        >
          <use
            href={`/src/assets/icons/sprite.svg#${
              variant === "dailyInfo" ? "icon-plus1" : "icon-plus"
            }`}
          />
        </svg>
        <span
          className={`${styles.buttonText} ${
            variant === "dailyInfo" ? styles.dailyInfoText : ""
          }`}
        >
          Add water
        </span>
      </button>

      {isModalOpen && <AddWaterModal onClose={closeModal} />}
    </React.Fragment>
  );
};

export default AddWaterButton;

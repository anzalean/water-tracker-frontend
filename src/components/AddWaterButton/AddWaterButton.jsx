import React, { useState } from "react";
import iconsPath from "../../assets/icons/sprite.svg"; 
import styles from "./AddWaterButton.module.css";
import AddWaterModal from "../AddWaterModal/AddWaterModal";

const AddWaterButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <React.Fragment>
      <button className={styles.buttonContainer} onClick={openModal}>
        <svg className={styles.buttonIcon} width="30" height="30">
          <use href={`${iconsPath}#icon-plus`} />
        </svg>
        <span className={styles.buttonText}>Add water</span>
      </button>

      {isModalOpen && <AddWaterModal onClose={closeModal} />}
    </React.Fragment>
  );
};

export default AddWaterButton;

import React, { useState } from "react";
import iconsPath from "../../assets/icons/sprite.svg";
import AddWaterModal from "../AddWaterModal/AddWaterModal";
import css from "./CreateWaterBtn.module.css";

const CreateWaterBtn = () => {
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
      <div>
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
          <span className={css.text}>Add water</span>
        </button>
        {isModalOpen && <AddWaterModal onClose={closeModal} />}
      </div>
    </React.Fragment>
  );
};

export default CreateWaterBtn;

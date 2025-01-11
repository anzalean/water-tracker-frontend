// import React from 'react'
import { useState } from "react";
import Modal from "../components/UI/Modal/Modal.jsx";
import { WaterModal } from "../components/WaterModal/WaterModal.jsx";

export const ConnectModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const title = "Edit the entered amount of water";
  const subtitle = "Correct entered data:";

  return (
    <div>
      <button
        onClick={openModal}
      ></button>
      {isOpen && (
        <Modal onClose={closeModal}>
          <WaterModal title={title} subtitle={subtitle} onClose={closeModal} />
        </Modal>
      )}
    </div>
  );
};

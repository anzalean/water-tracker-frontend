import  { useState } from "react";
import { DeleteWaterModal } from "../DeleteWaterModal/DeleteWaterModal";
import css from "../UserBar/UserBar.module.css";
import Modal from "../Modal/Modal";

export default function UserBar() {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleOpenModal = () => {
    setShowDeleteModal(true);
  };

  const handleCloseModal = () => {
    setShowDeleteModal(false);
  };

  const handleApproveDelete = () => {
  
    console.log("Entry Deleted");
    setShowDeleteModal(false);
  };

  return (
    <div className={css.userBarContainer}>
     
      <button
        className={css.deleteEntryBtn}
        onClick={handleOpenModal}
      >
        Delete Entry
      </button>

      
      {showDeleteModal && (
        <Modal onClose={() => setShowDeleteModal(false)}>
        <DeleteWaterModal
          onCancel={handleCloseModal}
          onApprove={handleApproveDelete}
          />
          </Modal>
      )}
    </div>
  );
}

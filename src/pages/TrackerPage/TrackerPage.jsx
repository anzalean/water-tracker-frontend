import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Container } from "../../components/Container/Container";
import WaterMainInfo from "../../components/WaterMainInfo/WaterMainInfo";
import Modal from "../../components/Modal/Modal";
import { WaterModal } from "../../components/WaterModal/WaterModal";
import WaterDetailedInfo from "../../components/WaterDetailedInfo/WaterDetailedInfo";
import styles from "./TrackerPage.module.css";


export default function TrackerPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddWater = () => {
    console.log("Add Water button clicked");
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    // <Container>
    //   <Helmet>
    //     <title>Tracker</title>
    //   </Helmet>
    //   <div className={styles.wrapper}>
    //     <WaterMainInfo onAddWater={handleAddWater} />
    //   </div>

    //   <div className={styles.detailedInfo}>
    //     <WaterDetailedInfo />
    //   </div>

    //   {isModalOpen && (
    //     <Modal onClose={handleCloseModal}>
    //       <WaterModal
    //         title="Add Water"
    //         subtitle="Track your daily water intake"
    //         onClose={handleCloseModal}
    //       />
    //     </Modal>
    //   )}
    // </Container>
  );
}

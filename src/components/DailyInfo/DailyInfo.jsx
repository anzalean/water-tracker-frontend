// import React, { useState, useEffect } from "react";
import ChooseDate from "../ChooseDate/ChooseDate";
import AddWaterButton from "../AddWaterButton/AddWaterButton";
import WaterList from "../WaterList/WaterList";
import Modal from "../Modal/Modal";
import { WaterModal } from "../WaterModal/WaterModal";
import styles from "./DailyInfo.module.css";
import { useState } from "react";

const DailyInfo = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);

  const waterData = [
    { id: 1, volume: 250, time: "7:00 AM" },
    { id: 2, volume: 300, time: "11:00 AM" },
    { id: 3, volume: 200, time: "2:00 PM" },
    { id: 4, volume: 400, time: "6:00 PM" },
    { id: 5, volume: 350, time: "8:00 PM" },
  ];

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };

  const handleAddWater = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const calculateProgress = () => {
    const totalItems = 10;
    const currentItems = waterData.length;
    return (currentItems / totalItems) * 100;
  };

  return (
    <div className={styles.dailyInfo}>
      <div className={styles.header}>
        <ChooseDate date={selectedDate} onChange={handleDateChange} />
        <AddWaterButton onClick={handleAddWater} variant="dailyInfo" />
      </div>

      <div className={styles.waterListContainer}>
        <WaterList items={waterData} />
      </div>

      <div className={styles.progressBar}>
        <div
          className={styles.progressFill}
          style={{ width: `${calculateProgress()}%` }}
        ></div>
      </div>

      {isModalOpen && (
        <Modal onClose={handleCloseModal}>
          <WaterModal
            title="Add Water"
            subtitle="Track your daily water intake"
            onClose={handleCloseModal}
          />
        </Modal>
      )}
    </div>
  );
};

export default DailyInfo;

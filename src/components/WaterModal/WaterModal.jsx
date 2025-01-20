// import React from 'react'
import css from "./WaterModal.module.css";
import { WaterForm } from "../WaterForm/WaterForm.jsx";

export const WaterModal = ({ title, subtitle, onSave, initialData }) => {
  return (
    <div className={css.waterModal}>
      <div className={css.waterModalTitles}>
        <h2 className={css.waterModalTitle}>{title}</h2>
        <h3 className={css.waterModalSubtitle}>{subtitle}</h3>
      </div>
      <WaterForm onSave={onSave} initialData={initialData}  className={css.waterForm}/>
    </div>
  );
};

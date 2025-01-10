import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Container } from '../../components/Container/Container';
import WaterMainInfo from '../../components/WaterMainInfo/WaterMainInfo';
import styles from './TrackerPage.module.css';

export default function TrackerPage() {
  const handleAddWater = () => {
    console.log('Add Water button clicked'); // Логика для модального окна добавления воды
  };

  return (
    <Container>
      <Helmet>
        <title>Tracker</title>
      </Helmet>
      <div className={styles.wrapper}>
        <WaterMainInfo dailyNorm={1.5} progress={50} onAddWater={handleAddWater} />
      </div>
    </Container>
  );
}

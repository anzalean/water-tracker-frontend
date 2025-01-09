import { Helmet } from 'react-helmet-async';
import { Container } from '../../components/Container/Container';
import { Page } from '../../components/Page/Page';
import WaterProgressBar from '../../components/WaterProgressBar/WaterProgressBar';
import AddWaterButton from '../../components/AddWaterButton/AddWaterButton';
import css from './TrackerPage.module.css';

export default function TrackerPage() {
  const handleAddWater = () => {
    console.log('Add Water button clicked'); 
  };

  return (
    <Container>
      <Helmet>
        <title>Tracker</title>
      </Helmet>
      <Page>
        <div className={css.TrackerPage}>
          <h1>Water Tracker</h1>
          <WaterProgressBar progress={50} />
          <AddWaterButton onClick={handleAddWater} />
        </div>
      </Page>
    </Container>
  );
}

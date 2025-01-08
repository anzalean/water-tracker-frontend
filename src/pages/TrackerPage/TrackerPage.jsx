import { Helmet } from 'react-helmet-async';
import { Container } from '../../components/Container/Container';
import { Page } from '../../components/Page/Page';
import css from './TrackerPage.module.css'; // Підключення стилів

export default function TrackerPage() {
  return (
    <Container>
      <Helmet>
        <title>Tracker</title>
      </Helmet>
      <Page>
        {<div className={css.TrackerPage}>Tracker</div>}
      </Page>
    </Container>
  );
}

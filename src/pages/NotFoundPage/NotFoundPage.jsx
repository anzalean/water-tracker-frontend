import { Helmet } from 'react-helmet-async';
import { Container } from '../../components/Container/Container';
import { Page } from '../../components/Page/Page';
import css from './NotFoundPage.module.css'; 

export default function NotFoundPage() {
  return (
    <Container>
      <Helmet>
        <title>Not Found</title>
      </Helmet>
      <Page>
        {<div className={css.NotFoundPage}>Not Found</div>}
      </Page>
    </Container>
  );
}

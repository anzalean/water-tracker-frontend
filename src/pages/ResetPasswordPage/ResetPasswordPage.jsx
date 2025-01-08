import { Helmet } from 'react-helmet-async';
import { Container } from '../../components/Container/Container';
import { Page } from '../../components/Page/Page';
import css from './ResetPasswordPage.module.css'; 

export default function ResetPasswordPage() {
  return (
    <Container>
      <Helmet>
        <title>Password Reset</title>
      </Helmet>
      <Page>
        {<div className={css.ResetPasswordPage}>Password Reset</div>}
      </Page>
    </Container>
  );
}

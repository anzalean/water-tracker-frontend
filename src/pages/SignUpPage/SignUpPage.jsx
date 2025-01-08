import { Helmet } from 'react-helmet-async';
import { Container } from '../../components/Container/Container';
import { Page } from '../../components/Page/Page';
import css from './SignUpPage.module.css'; 

export default function SignUpPage() {
  return (
    <Container>
      <Helmet>
        <title>Sign Up</title>
      </Helmet>
      <Page>
        {<div className={css.SignUpPage}>Sign Up</div>}
      </Page>
    </Container>
  );
}

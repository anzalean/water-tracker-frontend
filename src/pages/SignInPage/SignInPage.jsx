import { Helmet } from 'react-helmet-async';
import { Container } from '../../components/Container/Container';
import { Page } from '../../components/Page/Page';
import css from'./SignInPage.module.css'; 

export default function SignInPage() {
  return (
    <Container>
      <Helmet>
        <title>Sign In</title>
      </Helmet>
      <Page>
        {<div className={css.SignInPage}>Sign In</div>}
      </Page>
    </Container>
  );
}

import { Helmet } from 'react-helmet-async';
import { Container } from '../../components/Container/Container';
import { Page } from '../../components/Page/Page';
import css from './EmailVerifyPage.module.css'; 
import EmailVerifyForm from "../../components/EmailVerifyForm/EmailVerifyForm";


export default function EmailVerifyPage() {
  return (
    <Container>
      <Helmet>
        <title>Email Verification</title>
      </Helmet>
      <Page>
        {
          <div className={css.EmailVerifyPage}>
            Email Verification
            <EmailVerifyForm />
          </div>
        }
      </Page>
    </Container>
  );
}

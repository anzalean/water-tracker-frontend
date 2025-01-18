import { Helmet } from 'react-helmet-async';
import { Container } from '../../components/Container/Container';
import { Page } from '../../components/Page/Page';
import css from './EmailVerifyPage.module.css'; 
import EmailVerifyForm from "../../components/EmailVerifyForm/EmailVerifyForm";
import AdvantagesSection from "../../components/AdvantagesSection/AdvantagesSection";


export default function EmailVerifyPage() {
  return (
    <Container>
      <Helmet>
        <title>Email Verification</title>
      </Helmet>
      <Page>
        {
          <div className={css.EmailVerifyPage}>
            <EmailVerifyForm />
            <div className={css.advantagesDesktopOnly}>
              <AdvantagesSection />
            </div>
          </div>
        }
      </Page>
    </Container>
  );
}

import { Helmet } from 'react-helmet-async';
import { Container } from '../../components/Container/Container';
import { Page } from '../../components/Page/Page';
import css from './ResetPasswordPage.module.css'; 
import ResetPasswordForm from '../../components/ResetPasswordForm/ResetPasswordForm';
import AdvantagesSection from "../../components/AdvantagesSection/AdvantagesSection";

export default function ResetPasswordPage() {
  return (
    <Container>
      <Helmet>
        <title>Password Reset</title>
      </Helmet>
      <Page>
        {<div className={css.ResetPasswordPage}>
          <ResetPasswordForm/>
          <div className={css.advantagesDesktopOnly}>
              <AdvantagesSection />
          </div>
        </div>}
      </Page>
    </Container>
  );
}

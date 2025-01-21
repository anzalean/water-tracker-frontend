import { Helmet } from "react-helmet-async";
import { Container } from "../../components/Container/Container";
import { Page } from "../../components/Page/Page";
import SigninForm from "../../components/SigninForm/SigninForm";
import css from "./SignInPage.module.css";
import AdvantagesSection from "../../components/AdvantagesSection/AdvantagesSection.jsx";
import Languages from "../../components/Languages/Languages.jsx";

export default function SignInPage() {
  return (
    <Container>
      <Helmet>
        <title>Sign In</title>
      </Helmet>
      <Page>
        <Languages />
        {
          <div className={css.SignInPage}>
            <SigninForm />
            <div className={css.advantagesDesktopOnly}>
              <AdvantagesSection />
            </div>
          </div>
        }
      </Page>
    </Container>
  );
}

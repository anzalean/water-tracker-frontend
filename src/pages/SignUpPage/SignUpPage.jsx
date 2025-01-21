import { Helmet } from "react-helmet-async";
import { Container } from "../../components/Container/Container";
import { Page } from "../../components/Page/Page";
import css from "./SignUpPage.module.css";
import SignupForm from "../../components/SignupForm/SignupForm";
import AdvantagesSection from "../../components/AdvantagesSection/AdvantagesSection.jsx";
import Languages from "../../components/Languages/Languages.jsx";

export default function SignUpPage() {
  return (
    <Container>
      <Helmet>
        <title>Sign Up</title>
      </Helmet>
      <Page>
        <Languages />
        {
          <div className={css.SignUpPage}>
            <SignupForm />
            <div className={css.advantagesDesktopOnly}>
              <AdvantagesSection />
            </div>
          </div>
        }
      </Page>
    </Container>
  );
}

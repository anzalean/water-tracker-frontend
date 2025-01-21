import { Helmet } from "react-helmet-async";
import { Container } from "../../components/Container/Container";
import { Page } from "../../components/Page/Page.jsx";
import css from "./HomePage.module.css";
import { WelcomeSection } from "../../components/WelcomeSection/WelcomeSection.jsx";
import AdvantagesSection from "../../components/AdvantagesSection/AdvantagesSection.jsx";
import Languages from "../../components/Languages/Languages.jsx";

export default function HomePage() {
  return (
    <Container>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <Page>
        <Languages />
        {
          <div className={css.HomePage}>
            <WelcomeSection />
            <AdvantagesSection />
          </div>
        }
      </Page>
    </Container>
  );
}

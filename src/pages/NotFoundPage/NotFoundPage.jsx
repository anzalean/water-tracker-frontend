import { Helmet } from "react-helmet-async";
import { Container } from "../../components/Container/Container";
import { Page } from "../../components/Page/Page";
import { useNavigate } from "react-router-dom";
import css from "./NotFoundPage.module.css";

export default function NotFoundPage() {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <Container>
      <Helmet>
        <title>Not Found</title>
      </Helmet>
      <Page>
        <div className={css.contentWrapper}>
          <div className={css.astroImage}>
            <img src="src/assets/images/astro.jpg" alt="Astronaut" />
          </div>
          <div className={css.textContent}>
            <h1>404</h1>
            <h2>UH OH! You're lost.</h2>
            <p>
              Sorry, the page you are looking for does not exist. You can click
              the button below to go back to the homepage.
            </p>
            <br />
            <button className={css.btn404} onClick={handleBackToHome}>
              Back to Home
            </button>
          </div>
        </div>
      </Page>
    </Container>
  );
}

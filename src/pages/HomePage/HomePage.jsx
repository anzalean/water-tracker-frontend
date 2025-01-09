import { Helmet } from 'react-helmet-async';
import { Container } from '../../components/Container/Container';
import { Page } from '../../components/Page/Page.jsx';
import css from './HomePage.module.css'; 
import AdvantagesSection from "../../components/AdvantagesSection/AdvantagesSection.jsx";

export default function HomePage() {
  return (
    <Container>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <Page>
        {<div className={css.HomePage}>Home<AdvantagesSection /></div>}
        
      </Page>
      
    </Container>
  );
}

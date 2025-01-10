import { Helmet } from "react-helmet-async";
import { Container } from "../../components/Container/Container";
import { Page } from "../../components/Page/Page.jsx";
import css from "./HomePage.module.css";
import { useState } from "react";
import { Modal } from "../../components/Modal/Modal.jsx";
import { WaterModal } from "../../components/WaterModal/WaterModal.jsx";

export default function HomePage() {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const title = "Add Water";
  const subtitle = "Choose a value:";

  return (
    <Container>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <Page>
        {
          <div className={css.HomePage}>
            Home
            <button onClick={openModal}></button>
            {isOpen && (
              <Modal onClose={closeModal}>
                <WaterModal
                  title={title}
                  subtitle={subtitle}
                  onClose={closeModal}
                />
              </Modal>
            )}
          </div>
        }
      </Page>
    </Container>
  );
}

// import React, { useState } from "react";
// import { Helmet } from "react-helmet-async";
// import { Page } from "../../components/Page/Page";
// import WaterMainInfo from "../../components/WaterMainInfo/WaterMainInfo";
// import Modal from "../../components/Modal/Modal";
// import { WaterModal } from "../../components/WaterModal/WaterModal";
// import WaterDetailedInfo from "../../components/WaterDetailedInfo/WaterDetailedInfo";
// import style from "./TrackerPage.module.css";

// export default function TrackerPage() {
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const handleAddWater = () => {
//     console.log("Add Water button clicked");
//     setIsModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//   };

//   return (
//     <React.Fragment>
//       <Helmet>
//         <title>Tracker</title>
//       </Helmet>
//       <Page>
//         <div className={style.trackerPage}>
//           <WaterMainInfo onAddWater={handleAddWater} />
//           <WaterDetailedInfo />

//           {isModalOpen && (
//             <Modal onClose={handleCloseModal}>
//               <WaterModal
//                 title="Add Water"
//                 subtitle="Track your daily water intake"
//                 onSave={handleAddWater}
//               />
//             </Modal>
//           )}
//         </div>
//       </Page>
//     </React.Fragment>
//   );
// }

import React, {useEffect} from "react";
import { Helmet } from "react-helmet-async";
import { Page } from "../../components/Page/Page";
import WaterMainInfo from "../../components/WaterMainInfo/WaterMainInfo";
import WaterDetailedInfo from "../../components/WaterDetailedInfo/WaterDetailedInfo";
import css from "./TrackerPage.module.css";
import { useTour } from "@reactour/tour";
import steps from "../../helpers/steps";

export default function TrackerPage() {
  const { setIsOpen, isOpen } = useTour();
  
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

const startTour = () => {
  const firstStepSelector = steps[0].selector;
  const waitForSteps = setInterval(() => {
    const stepElement = document.querySelector(firstStepSelector);
    if (stepElement) {
      clearInterval(waitForSteps);
      setIsOpen(true);
    }
  }, 200);
};

  
  return (
    <React.Fragment>
      <Helmet>
        <title>Tracker</title>
      </Helmet>
      <Page>
        <div className={css.trackerPage}>
          <WaterMainInfo />
          <WaterDetailedInfo />
          <button
            data-tour="step-start"
            className={css.helpButton}
            onClick={startTour}
          >
            ?
          </button>
        </div>
      </Page>
    </React.Fragment>
  );
}

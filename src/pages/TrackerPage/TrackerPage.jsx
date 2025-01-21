import React from "react";
import { Helmet } from "react-helmet-async";
import { Page } from "../../components/Page/Page";
import WaterMainInfo from "../../components/WaterMainInfo/WaterMainInfo";
import WaterDetailedInfo from "../../components/WaterDetailedInfo/WaterDetailedInfo";
import css from "./TrackerPage.module.css";
import TourButton from "../../components/TourButton/TourButton";

export default function TrackerPage() {

  return (
    <React.Fragment>
      <Helmet>
        <title>Tracker</title>
      </Helmet>
      <Page>
        <div className={css.trackerPage}>
          <WaterMainInfo />
          <WaterDetailedInfo />
            <TourButton/>
        </div>
      </Page>
    </React.Fragment>
  );
}


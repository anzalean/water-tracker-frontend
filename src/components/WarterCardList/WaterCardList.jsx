import WaterCard from "../WaterCard/WaterCard";
import waterList from "../../data/warterCards.json"; // use useselector
import css from "./WaterCardList.module.css";

console.log("Water List", waterList);

const WaterCardList = () => {
  return (
    <div className={css.listContainer}>
      <ul className={css.list}>
        {waterList && waterList.length > 0 ? (
          waterList.map((waterItem) => (
            <li className={css.item} key={waterItem._id}>
              <WaterCard waterCard={waterItem} />
            </li>
          ))
        ) : (
          <p>No water records available</p>
        )}
      </ul>
    </div>
  );
};

export default WaterCardList;

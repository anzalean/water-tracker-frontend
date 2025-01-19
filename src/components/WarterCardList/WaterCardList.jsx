import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loading } from "../Loading/Loading";
import {
  selectWaterItems,
  selectWaterDate,
  selectWaterLoading,
} from "../../redux/water/selectors";
import { getDayWater } from "../../redux/water/waterOps";
import WaterCard from "../WaterCard/WaterCard";
import { successNotify, errNotify } from "../../helpers/notification";
import css from "./WaterCardList.module.css";

const WaterCardList = () => {
  const waterDate = useSelector(selectWaterDate);
  const waterList = useSelector(selectWaterItems);
  const isLoading = useSelector(selectWaterLoading);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDayWater(waterDate))
      .unwrap()
      .then(() => {
        successNotify("Success to fetch water data.");
      })
      .catch((error) => {
        errNotify("Failed to fetch water data.");
        console.error(error.message);
      });
  }, [dispatch, waterDate]);

  return isLoading ? (
    <div className={css.loader}>
      <Loading customHeight="124" />
    </div>
  ) : waterList && waterList.length > 0 ? (
    <div className={css.listContainer}>
      <ul className={css.list}>
        {waterList.map((waterItem) => (
          <li className={css.item} key={waterItem._id}>
            <WaterCard waterCard={waterItem} />
          </li>
        ))}
      </ul>
    </div>
  ) : (
    <div className={css.noRecord}>
      <p className={css.noRecordMessage}>No entries yet</p>
    </div>
  );
};

export default WaterCardList;

// import waterList from "../../data/warterCards.json";

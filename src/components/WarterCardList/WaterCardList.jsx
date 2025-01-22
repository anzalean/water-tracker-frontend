import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectWaterItems, selectWaterDate } from "../../redux/water/selectors";
import { getDayWater } from "../../redux/water/waterOps";
import WaterCard from "../WaterCard/WaterCard";
import { successNotify, errNotify } from "../../helpers/notification";
import css from "./WaterCardList.module.css";
import { useTranslation } from "react-i18next";

const WaterCardList = () => {
  const waterDate = useSelector(selectWaterDate);
  const waterList = useSelector(selectWaterItems);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getDayWater(waterDate))
      .unwrap()
      .then(() => {
        successNotify(t("toast.fetchUserDataSuccess"));
      })
      .catch((error) => {
        errNotify(t("toast.fetchUserDataError"), { message: error.message });  
      });
  }, [dispatch, waterDate, t]);

  return waterList && waterList.length > 0 ? (
    <div className={css.listContainer}>
      <ul className={css.list}>
        {waterList.map((waterItem) => (
          <li
            className={css.item}
            key={waterItem._id}
          >
            <WaterCard waterCard={waterItem} />
          </li>
        ))}
      </ul>
    </div>
  ) : (
    <div className={css.noRecord}>
      <p className={css.noRecordMessage}>{t("dailyInfo.text")}</p>
    </div>
  );
};

export default WaterCardList;

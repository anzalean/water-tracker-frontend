import photo1 from "../../assets/images/first_user.webp";
import photo2 from "../../assets/images/second_user.webp";
import photo3 from "../../assets/images/third_user.webp";
import styles from "./Customers.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserCount } from "../../redux/user/userOps.js";
import { selectUserCount } from "../../redux/user/selectors";
import { useTranslation } from "react-i18next";
//import { Loading } from "../Loading/Loading";

const Customers = () => {
  const usersCounter = useSelector(selectUserCount);
  //const usersLoading = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    if (usersCounter === null) {
      dispatch(getUserCount());
    }
  }, [dispatch, usersCounter]);
  return (
    <>
      <ul className={styles.userCountList}>
        <li className={styles.userCountItem}>
          <img src={photo1} alt="user" />
        </li>
        <li className={styles.userCountItem}>
          <img src={photo2} alt="user" />
        </li>
        <li className={styles.userCountItem}>
          <img src={photo3} alt="user" />
        </li>
      </ul>
      <div className={styles.numberCustomers}>+{usersCounter}</div>

      <p className={styles.userCountText}>
        {t("advantagesSection.our")}
        <span className={styles.userTextColor}>
          {t("advantagesSection.happy")}
        </span>
        {t("advantagesSection.customers")}
      </p>
    </>
  );
};

export default Customers;

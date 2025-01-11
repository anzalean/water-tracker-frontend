import photo1 from "../../assets/images/first_user.webp";
import photo2 from "../../assets/images/second_user.webp";
import photo3 from "../../assets/images/third_user.webp";
import styles from "./Customers.module.css";

const Customers = () => {
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
      <p className={styles.userCountText}>
        Our <span className={styles.userTextColor}> happy</span> customers
      </p>
    </>
  );
};

export default Customers;
import { useSelector } from "react-redux";
import css from "./UserPanel.module.css";
import { selectUser } from "../../redux/user/selectors";
import UserBar from "../UserBar/UserBar.jsx";
import { useTranslation } from "react-i18next";

const UserPanel = () => {
  const { name } = useSelector(selectUser);
  const { t } = useTranslation();

  // Функція для обмеження довжини імені
  const truncateName = (name) => {
    return name.length > 10 ? `${name.slice(0, 10)}...` : name;
  };

  return (
    <div className={css.panelContainer}>
      <h2 className={css.panelTitle}>
        {t("Userbar.hello")}
        <span className={css.titleSpan}>, {truncateName(name)}!</span>
      </h2>
      <div className={css.panelBar}>
        <UserBar />
      </div>
    </div>
  );
};

export default UserPanel;

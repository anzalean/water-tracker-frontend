import { useSelector } from "react-redux";
import css from "./UserPanel.module.css";
import { selectUser } from "../../redux/user/selectors";
import UserBar from "../UserBar/UserBar.jsx";
import { useTranslation } from "react-i18next";

const UserPanel = () => {
  const { name } = useSelector(selectUser);
  const { t } = useTranslation();

  return (
    <div data-tour="step-profile" className={css.panelContainer}>
      <h2 className={css.panelTitle}>
        {t("Userbar.hello")}
        <span className={css.titleSpan}>, {name}!</span>
      </h2>
      <div className={css.panelBar}>
        <UserBar />
      </div>
    </div>
  );
};

export default UserPanel;

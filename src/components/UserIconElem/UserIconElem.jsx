import clsx from "clsx";
import iconsPath from "../../assets/icons/sprite.svg";
import css from "./UserIconElem.module.css";

const UserIconElem = ({
  iconId = "icon-user",
  altText = "default user",
  containerClass = null,
  iconClass = null,
  isSmall = false,
}) => {
  return (
    <div className={clsx(css.container, containerClass, isSmall && css.small)}>
      <svg
        className={clsx(css.icon, iconClass)}
        aria-label={`Icon of ${altText}`}
      >
        <use href={`${iconsPath}#${iconId}`} />
      </svg>
    </div>
  );
};

export default UserIconElem;

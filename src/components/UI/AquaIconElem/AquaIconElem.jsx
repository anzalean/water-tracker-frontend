import clsx from "clsx";
import iconsPath from "../../../assets/icons/sprite.svg";
import css from "./AquaIconElem.module.css";

const AquaIconElem = ({
  iconId = "icon-user",
  altText = "default user",
  containerClass = null,
  iconClass = null,
}) => {
  return (
    <div className={clsx(css.container, containerClass)}>
      <svg
        className={clsx(css.icon, iconClass)}
        aria-label={`Icon of ${altText}`}
      >
        <use href={`${iconsPath}#${iconId}`} />
      </svg>
    </div>
  );
};

export default AquaIconElem;

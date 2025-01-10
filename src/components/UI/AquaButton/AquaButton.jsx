import css from "./AquaButton.module.css";
import clsx from "clsx";

const AquaButton = ({
  children,
  onClick,
  size = "large",
  background = "primary",  
  width,
  icon = null,
  as = "button",
  href,
  ...props
}) => {
  const style = {
    width: width || "100%",
  };

  const Component = as;
  return (
    <Component
      className={clsx(
        css.btn,
        css[size],
        css[background],       
      )}
      style={style}
      onClick={onClick}
      href={href}
      {...props}
    >
      {children}
      {icon && icon}
    </Component>
  );
};

export default AquaButton;

// const size = ["large", "medium", "small"];
// const background = ["primary", "secondary", "transparent", "cancel"];


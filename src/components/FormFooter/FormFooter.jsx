import s from "./FormFooter.module.css";
import { Link } from "react-router-dom";

export default function FormFooter({ text, linkText, linkHref }) {
  return (
    <p className={s.footer}>
      {text}{" "}
      <Link to={linkHref} className={s.link}>
        {linkText}
      </Link>
    </p>
  );
}

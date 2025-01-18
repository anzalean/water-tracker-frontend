import s from "./FormFooter.module.css";

export default function FormFooter({ text, linkText, linkHref }) {
  return (
      <p className={s.footer}>
        {text}{" "}
        <a href={linkHref} className={s.link}>
          {linkText}
        </a>
      </p>
  );
}

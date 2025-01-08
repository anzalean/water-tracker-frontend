import css from './Page.module.css';

export const Page = ({ children }) => {
  return (
    <div className={css.page}>
      {children}
    </div>
  );
};
import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Logo from "../Logo/Logo";
import css from "./SharedLayout.module.css";

export const SharedLayout = () => {
  return (
    <div>
      <Suspense fallback={null}>
        <header className={css.header}>
          <Logo />
        </header>
        <Outlet />
      </Suspense>
    </div>
  );
};

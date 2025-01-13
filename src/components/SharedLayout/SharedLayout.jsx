import { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import TempLoginBtn from "../../components/TempLogInBtn/TempLogInBtn";
import TempLogoutBtn from "../../components/TempLogOutBtn/TempLogOutBtn";
import TempSettings from "../../components/TempSettingsBtn/TempSettingsBtn";

export const SharedLayout = () => {
  return (
    <div>
      <Suspense fallback={null}>
        <TempLoginBtn /> <TempLogoutBtn /> <TempSettings />
        <Outlet />
      </Suspense>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

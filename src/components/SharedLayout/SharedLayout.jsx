import { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";

// import TempLoginBtn from "../../components/TempLogInBtn/TempLogInBtn";

export const SharedLayout = () => {
  return (
    <div>
      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

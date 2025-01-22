import { lazy, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { SharedLayout } from "./components/SharedLayout/SharedLayout";
import { fetchCurrentUser } from "./redux/user/userOps";
import { RestrictedRoute } from "./components/RestrictedRoute";
import { PrivateRoute } from "./components/PrivateRoute";

import { TourProvider } from "@reactour/tour";
import steps from "./helpers/steps";
// import { selectIsLoggedIn } from "./redux/user/selectors";

const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const SignInPage = lazy(() => import("./pages/SignInPage/SignInPage"));
const EmailVerifyPage = lazy(() =>
  import("./pages/EmailVerifyPage/EmailVerifyPage")
);
const SignUpPage = lazy(() => import("./pages/SignUpPage/SignUpPage"));
const TrackerPage = lazy(() => import("./pages/TrackerPage/TrackerPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage/NotFoundPage"));
const ResetPasswordPage = lazy(() =>
  import("./pages/ResetPasswordPage/ResetPasswordPage")
);
const ConfirmGoogleAuth = lazy(() =>
  import("./pages/ConfirmGoogleAuth/ConfirmGoogleAuth")
);

export function App() {
  const dispatch = useDispatch();
  const [isTourOpen, setIsTourOpen] = useState(false);
  // const isLoggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    dispatch(fetchCurrentUser())
      .unwrap()
      .then(() => {})
      .catch(() => {});
  }, [dispatch]);

  useEffect(() => {
    document.body.style.overflow = "auto"; 
    return () => {
      document.body.style.overflow = "auto"; 
    };
    }, []);
  
    useEffect(() => {
    if (isTourOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isTourOpen]);

  return (
    <TourProvider
      steps={steps}
      onClose={() => setIsTourOpen(false)}
      onBeforeOpen={() => setIsTourOpen(true)}
      styles={{
        maskWrapper: (base) => ({
          ...base,
          pointerEvents: "auto", 
        }),
        highlightedArea: (base) => ({
          ...base,
          pointerEvents: "auto", 
        }),
      }}
    >
      <div>
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            <Route
              index
              element={
                <RestrictedRoute
                  redirectTo="/tracker"
                  component={<HomePage />}
                />
              }
            />
            <Route
              path="/signup"
              element={
                <RestrictedRoute
                  redirectTo="/tracker"
                  component={<SignUpPage />}
                />
              }
            />
            <Route
              path="/verify/:verifyToken"
              element={
                <RestrictedRoute
                  redirectTo="/signin"
                  component={<EmailVerifyPage />}
                />
              }
            />
            <Route
              path="/signin"
              element={
                <RestrictedRoute
                  redirectTo="/tracker"
                  component={<SignInPage />}
                />
              }
            />
            <Route
              path="/tracker"
              element={
                <PrivateRoute
                  redirectTo="/signin"
                  component={<TrackerPage />}
                />
              }
            />
            <Route
              path="/auth/reset-password"
              element={
                <RestrictedRoute
                  redirectTo="/tracker"
                  component={<ResetPasswordPage />}
                />
              }
            />
            <Route
              path="/confirm-google-auth"
              element={<ConfirmGoogleAuth />}
            />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </div>
    </TourProvider>
  );
}

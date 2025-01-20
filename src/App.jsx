import { lazy, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { SharedLayout } from "./components/SharedLayout/SharedLayout";
import { fetchCurrentUser } from "./redux/user/userOps";
import { RestrictedRoute } from "./components/RestrictedRoute";
import { PrivateRoute } from "./components/PrivateRoute";
import ConfirmGoogleAuth from "./pages/ConfirmGoogleAuth/ConfirmGoogleAuth";

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

export function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  return (
    <div>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<HomePage />} />
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
            path="/confirm-google-auth"
            element={
              <RestrictedRoute
                redirectTo="/tracker"
                component={<ConfirmGoogleAuth />}
              />
            }
          />
          <Route
            path="/tracker"
            element={
              <PrivateRoute redirectTo="/signin" component={<TrackerPage />} />
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
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </div>
  );
}

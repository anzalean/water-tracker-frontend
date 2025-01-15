import { lazy, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { SharedLayout } from "./components/SharedLayout/SharedLayout";
import { useDispatch, useSelector } from "react-redux";
import { selectIsRefreshing } from "./redux/user/selectors";
import { fetchCurrentUser } from "./redux/user/userOps";
import { RestrictedRoute } from "./components/RestrictedRoute";
import { PrivateRoute } from "./components/PrivateRoute";
import { Loading } from "./components/Loading/Loading";
import { GoogleOAuthProvider } from "@react-oauth/google";

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

  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  return isRefreshing ? (
    <div className="loader">
      <Loading />
    </div>
  ) : (
    <GoogleOAuthProvider clientId="416780880266-5n7irv3l8fmjbbi7v56vafihee55k2eo.apps.googleusercontent.com">
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
              path="/tracker"
              element={
                <PrivateRoute
                  redirectTo="/signin"
                  component={<TrackerPage />}
                />
              }
            />
            <Route
              path="/reset/:resetToken"
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
    </GoogleOAuthProvider>
  );
}

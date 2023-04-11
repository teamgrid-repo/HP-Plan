import { lazy, Suspense, useContext, useEffect } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router";
import { AuthContext } from "./Auth";
import PrivateLayout from "./Layouts/PrivateLayout";
import PublicLayout from "./Layouts/PublicLayout";
import AdminHome from "./pages/Admin/Home/Home";
import AdminProfile from "./pages/Admin/Home/Profile";

import RoutePath from "./Route";
import { getFBToken, regNotiData } from "./firebaseConfig";
import { updateFcm } from "./redux/actions/auth/authActions";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";

// const Home = lazy(() => import("./pages/Public/Home"));
// const ProviderHome = lazy(() => import("./pages/Private/ProviderUser/Home"));
// const ClientHome = lazy(() => import("./pages/Private/GeneralUser/Home"));

import { ErrorBoundary } from "react-error-boundary";
import { getCms } from "./redux/actions/Admin/AdminActions";
import LoadingComponent from "./components/UI/LoadingComponent";

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

const Home = lazy(() => import("./pages/Public/Home"));

const App = () => {
  const cms = useSelector((state) => state.cms);

  const auth = useContext(AuthContext);
  const history = useNavigate();
  const dispatch = useDispatch();
  const actions = bindActionCreators({ updateFcm, getCms }, dispatch);
  const cu = auth.currentUser;
  const role = (cu && cu.role) || "";
  const subRole = (cu && cu.subRole) || "";
  const loadToken = async () => {
    if (cu && cu.role && (cu.role === "user" || cu.role === "provider")) {
      Notification.requestPermission(async (res) => {
        const toc = await getFBToken();
        if (toc) {
          regNotiData(history);
          await actions.updateFcm({ fcmToken: toc });
        }
      });
    }
  };
  const loadCms = () => {
    if (cms.load) {
      actions.getCms();
    }
  };
  useEffect(() => {
    loadToken();
    loadCms();
  }, []);
  // const puser = cu && role && role === "provider";
  // const cuser = cu && role && role === "user";
  // const auser = cu && role && role === "admin";
  return (
    <Routes>
      <Route path="/" element={role ? <PrivateLayout /> : <PublicLayout />}>
        <Route
          path="/"
          element={
            <Suspense fallback={<LoadingComponent />}>
              {role && "admin".includes(role) ? (
                subRole && subRole === "analyst" ? (
                  <AdminProfile />
                ) : (
                  <AdminHome />
                )
              ) : (
                <Home title="Home" />
              )}
            </Suspense>
          }
        />
        {RoutePath.map((r) => (
          <Route
            key={r.path}
            path={r.path}
            element={
              r.role.includes("all") || (role && r.role.includes(role)) ? (
                <Suspense fallback={<LoadingComponent />}>
                  <ErrorBoundary
                    FallbackComponent={ErrorFallback}
                    onReset={() => history("/", { replace: "true" })}
                  >
                    <r.element title={r.name || ""} />
                  </ErrorBoundary>
                </Suspense>
              ) : (
                <Navigate to="/" />
              )
            }
          />
        ))}
      </Route>
    </Routes>
  );
};

export default App;

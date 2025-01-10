import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { AuthProvider } from "./context/authContext";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Auth from "./components/Auth/Auth";
import { Suspense, lazy } from "react";
import Loading from "./components/Loading/Loading";

const SidebarLayout = lazy(() => import("./layouts/SidebarLayout"));
const SearchFilterLayout = lazy(() => import("./layouts/SearchFilterLayout"));
const DashboardHome = lazy(() => import("./pages/DashboardHome"));
const DashboardFavorite = lazy(() => import("./pages/DashboardFavorite"));
const DashboardTrash = lazy(() => import("./pages/DashboardTrash"));
const CreateBook = lazy(() => import("./pages/CreateBook"));

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<Auth />}>
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/" element={<Login />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route element={<SidebarLayout />}>
            <Route
              element={
                <Suspense fallback={<Loading />}>
                  <SearchFilterLayout />
                </Suspense>
              }
            >
              <Route path="/dashboard" element={<DashboardHome />} />
              <Route
                path="/dashboard/favorite"
                element={<DashboardFavorite />}
              />
              <Route path="/dashboard/trash" element={<DashboardTrash />} />
            </Route>
            <Route
              path="/dashboard/create-book"
              element={
                <Suspense fallback={<Loading />}>
                  <CreateBook />
                </Suspense>
              }
            />
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;

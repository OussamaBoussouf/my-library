import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import BookProvider from "./context/bookContext";
import { AuthProvider } from "./context/authContext";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Auth from "./components/Auth/Auth";
import { Suspense, lazy} from "react";
import Loading from "./components/Loading/Loading";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Home = lazy(() => import("./pages/Home"));
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
          <Route
            path="/dashboard"
            element={
              <BookProvider>
                <Dashboard />
              </BookProvider>
            }
          >
            <Route
              path="/dashboard"
              element={
                <Suspense fallback={<Loading />}>
                  <Home />
                </Suspense>
              }
            />
            <Route
              path="/dashboard/favorite"
              element={
                <Suspense fallback={<Loading />}>
                  <Home />
                </Suspense>
              }
            />
            <Route
              path="/dashboard/trash"
              element={
                <Suspense fallback={<Loading />}>
                  <Home />
                </Suspense>
              }
            />
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

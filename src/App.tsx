import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import CreateBook from "./pages/CreateBook";
import BookProvider from "./context/bookContext";

function App() {
  return (
    <>
      <Routes>
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <BookProvider>
              <Dashboard />
            </BookProvider>
          }
        >
          <Route path="/dashboard" element={<Home />} />
          <Route path="/dashboard/favorite" element={<Home />} />
          <Route path="/dashboard/trash" element={<Home />} />
          <Route path="/dashboard/create-book" element={<CreateBook />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <>
      <Routes>
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/" element={<Login />} />
        {/* <Route path="/dashboard/:id" element={<Dashboard />} /> */}
      </Routes>
    </>
  );
}

export default App;

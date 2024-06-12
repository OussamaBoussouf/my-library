import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Favorite from "./pages/Favorite";
import DeletedBooks from "./pages/DeletedBooks";
import CreateBook from "./pages/CreateBook";

function App() {
  return (
    <>
      <Routes>
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard/>}> 
          <Route path="/dashboard" element={< Home/>}/>
          <Route path="/dashboard/favorite" element={< Favorite/>}/>
          <Route path="/dashboard/trash" element={< DeletedBooks/>}/>
          <Route path="/dashboard/create-book" element={< CreateBook/>}/>
        </Route>
      </Routes>
    </>
  );
}

export default App;

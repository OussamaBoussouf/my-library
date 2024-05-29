
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard/Dashboard";


function App() {

  const RootLayout = () => {
    return (
      <>
        <Navbar />
        <Outlet />
      </>
    );
  };
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },{
          path: "/dashboard/:id",
          element: <Dashboard/>
        }
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;


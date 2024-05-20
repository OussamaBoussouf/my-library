
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";

function App() {
  const RootLayout = () => {
    return (
      <>
        <Navbar />
        <Outlet />
        {/* <Footer /> */}
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
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;


import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";


function Dashboard() {
  return (
    <div className="bg-[#101114]">
      <Navbar />
      <Sidebar />
      <div className="flex justify-center items-center">
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;

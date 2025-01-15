
import Navbar from "../components/Navbar/Navbar";

import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";

function SidebarLayout() {
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

export default SidebarLayout;

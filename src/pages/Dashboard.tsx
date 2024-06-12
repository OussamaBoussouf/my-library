import { Search } from "lucide-react";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import Select from "../components/ui/Select";
import { Outlet } from "react-router-dom";

const options = ["all", "drama", "fiction", "non-fiction", "comedie"];

function Dashboard() {
  return (
    <div className="bg-[#101114]">
      <Navbar />
      <Sidebar />
      <div className="flex justify-center">
        <div className="text-white sm:ml-[200px] md:ml-[250px] w-[95vw] max-w-[1000px] p-5 min-h-screen">
          {/* Search bar */}
          <div className="relative">
            <Search className="absolute top-1/2 -translate-y-1/2 left-4" />
            <input
              type="search"
              placeholder="Type here to search"
              className="bg-[#15171c] w-full p-2 rounded-md pl-12"
            />
          </div>
          {/* Filter bar */}
          <div className="flex justify-between items-center my-10">
            <h2 className="text-3xl font-roboto-bold">All Books</h2>
            <Select options={options}/>
          </div>
          {/* List of books */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-10 gap-x-10">
            <Outlet/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

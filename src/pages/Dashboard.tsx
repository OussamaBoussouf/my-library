import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";

function Dashboard() {
  return (
    <div className="bg-[#101114]">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="text-white flex-grow p-5 sm:ml-[200px] md:ml-[250px] h-screen">Text content this is it</div>
      </div>
    </div>
  );
}

export default Dashboard;

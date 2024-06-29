import Button from "../ui/Button";
import logo from "../../assets/orange-book.svg";
//ICONS
import { Home, Star, Trash, SquarePen } from "lucide-react";
import { Link, useLocation} from "react-router-dom";
import { useAuth } from "../../context/authContext";

const sidebarItems = [
  {
    icon: <Home color="#737477" />,
    text: "Home",
    url: "/dashboard"
  },
  {
    icon: <Star color="#737477" />,
    text: "Favorite",
    url: "/dashboard/favorite"
  },
  {
    icon: <Trash color="#737477" />,
    text: "Trash",
    url: "/dashboard/trash"
  },
  {
    icon: <SquarePen color="#737477" />,
    text: "Create New Book",
    url: "/dashboard/create-book"
  },
];

function Sidebar() {

  const location = useLocation().pathname;
  const {logOut} = useAuth();

  return (
    <div className="text-white py-6 hidden sm:block w-[200px] md:w-[250px] fixed top-0 bottom-0 bg-[#15171c] ">
      <div className="flex items-center px-6 mb-16">
        <img width={30} height={30} src={logo} alt="logo" className="mr-2" />
        <h1 className="text-xl font-bold">Libro</h1>
      </div>
      <div className="flex flex-col justify-between h-[80%] text-[#737477]">
        <ul className="space-y-2">
          {sidebarItems.map((item, index) => (
            <Link key={index} to={item.url}>
              <li
                className={`${location == item.url ? "bg-gradient-to-r from-[#232529] to-[#17191e] border-r-4 border-orange-500 text-white" : ""} hover:bg-gradient-to-r from-[#232529] to-[#17191e] hover:border-r-4 hover:border-orange-500 hover:text-white text-sm md:text-base cursor-pointer px-6 py-4 flex items-center gap-4`}
              >
                {item.icon} {item.text}
              </li>
            </Link>
          ))}
        </ul>
        <div className="px-6">
          <Button onClick={logOut}>Logout</Button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;

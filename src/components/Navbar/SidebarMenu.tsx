import { Home, SquarePen, Star, Trash, X } from "lucide-react";
import logo from "../../assets/orange-book.svg";
import Button from "../ui/Button";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

const sidebarItems = [
  {
    icon: <Home color="#737477" />,
    text: "Home",
    url: "/dashboard",
  },
  {
    icon: <Star color="#737477" />,
    text: "Favorite",
    url: "/dashboard/favorite",
  },
  {
    icon: <Trash color="#737477" />,
    text: "Trash",
    url: "/dashboard/trash",
  },
  {
    icon: <SquarePen color="#737477" />,
    text: "Create New Book",
    url: "/dashboard/create-book",
  },
];

function SidebarMenu({
  open,
  onClick,
}: {
  open: boolean;
  onClick: () => void;
}) {
  const location = useLocation().pathname;

  useEffect(() => {
    if (open) onClick();
  }, [location]);

  return (
    <div
      className={`text-white ${
        open ? "-translate-x-[0%]" : "-translate-x-[100%]"
      } transition-all duration-700 w-[80vw] max-w-[300px] bg-[#15171c] top-0 left-0 bottom-0 fixed z-10 py-6`}
    >
      <button onClick={onClick} type="button" className="float-end me-2">
        <X />
      </button>
      <div className="flex items-center px-6 mb-16">
        <img width={30} height={30} src={logo} alt="logo" className="mr-2" />
        <h1 className="text-xl font-bold">Libro</h1>
      </div>
      <div className="flex flex-col justify-between h-[80%] text-[#737477]">
        <ul className="space-y-2">
          {sidebarItems.map((item, index) => (
            <Link key={index} to={item.url}>
              <li
                className={`${
                  location == item.url
                    ? "bg-gradient-to-r from-[#232529] to-[#17191e] border-r-4 border-orange-500 text-white"
                    : ""
                } hover:bg-gradient-to-r from-[#232529] to-[#17191e] hover:border-r-4 hover:border-orange-500 hover:text-white text-sm md:text-base cursor-pointer px-6 py-4 flex items-center gap-4`}
              >
                {item.icon} {item.text}
              </li>
            </Link>
          ))}
        </ul>
        <div className="px-6">
          <Button>Logout</Button>
        </div>
      </div>
    </div>
  );
}

export default SidebarMenu;

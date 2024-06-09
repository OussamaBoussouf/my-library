import { Home, SquarePen, Star, Trash, X } from "lucide-react";
import logo from "../../assets/img/mainLogo.png";
import Button from "../ui/Button";

const sidebarItems = [
  {
    icon: <Home color="#737477" />,
    text: "Home",
  },
  {
    icon: <Star color="#737477" />,
    text: "Favorite",
  },
  {
    icon: <Trash color="#737477" />,
    text: "Trash",
  },
  {
    icon: <SquarePen color="#737477" />,
    text: "Create New Book",
  },
];

function SidebarMenu({
  open,
  onClick,
}: {
  open: boolean;
  onClick: () => void;
}) {
  return (
    <div
      className={`text-white ${
        open ? "-translate-x-[100%]" : "-translate-x-[0%]"
      } transition-all duration-700 w-[80vw] max-w-[300px] bg-[#15171c] top-0 left-0 bottom-0 fixed py-6`}
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
        {sidebarItems.map((item) => (
            <li className="hover:bg-gradient-to-r from-[#232529] to-[#17191e] hover:border-r-4 hover:border-orange-500 hover:text-white cursor-pointer px-6 py-4 flex items-center gap-4">
              {item.icon} {item.text}
            </li>
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

import { Menu } from "lucide-react";
import { useToggle } from "../../hooks/useToggle";
import logo from "../../assets/img/mainLogo.png";
import SidebarMenu from "./SidebarMenu";

function Navbar() {
  const { toggle: open, toggleExpand } = useToggle();

  return (
    <nav className="sm:hidden">
      <div className="flex items-center justify-between p-3">
        <img height={30} width={30} src={logo} alt="logo" />
        <button onClick={toggleExpand} type="button">
          <Menu color="gray"/>
        </button>
      </div>
      <SidebarMenu open={open} onClick={toggleExpand} />
    </nav>
  );
}

export default Navbar;

import { useEffect, useRef } from "react";
import { useClickOutside } from "../../hooks/useClickOutside";
import { useToggle } from "../../hooks/useToggle";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";


function Avatar() {
  const { toggle, toggleExpand } = useToggle();
  const {user, logOut} = useAuth();
  const menuNode = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  useClickOutside(menuNode, toggleExpand, toggle);

  const logOutUser = () => {
    logOut();
    navigate("/");
  }

  useEffect(() => {
    if (toggle) {
      toggleExpand();
    }
  }, [location.pathname]);

  return (
    <div ref={menuNode} className="relative">
      <button
        type="button"
        aria-expanded={true}
        onClick={toggleExpand}
        className="bg-orange-500  text-white font-bold flex items-center justify-center cursor-pointer w-[40px] h-[40px] rounded-full"
      >
        {user?.name?.substring(0, 2).toUpperCase()}
      </button>
      {toggle ? (
        <div className="w-28 bg-white shadow-lg rounded-md absolute top-[110%] end-0">
          <ul className="py-3 space-y-2">
            <li className="px-2 cursor-pointer hover:bg-slate-300">
              <Link to="/dashboard/all-books">Dashboard</Link>
            </li>
            <li
              onClick={logOutUser}
              tabIndex={0}
              className="px-2 cursor-pointer hover:bg-slate-300"
            >
              Log Out
            </li>
          </ul>
        </div>
      ) : null}
    </div>
  );
}

export default Avatar;

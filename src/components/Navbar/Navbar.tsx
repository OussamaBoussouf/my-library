import { useContext } from "react";
import logo from "../../assets/img/logo.jpg";
import Login from "../Login/Login";
import SignUp from "../SignUp/SignUp";
import { AuthContext } from "../../context/authContext";
import Avatar from "../Avatar/Avatar";

interface User {
  uid: string;
  name: string;
}

function Navbar() {
  const user = useContext<User | null>(AuthContext);

  return (
    <nav className="py-2 px-5 bg-gray-100 shadow-lg">
      <div className="max-w-[1200px] flex items-center justify-between mx-auto">
        <div className="flex items-center">
          <img className="rounded-lg me-2" width={46} src={logo} alt="book" />
          <p className="font-poetsenOne text-xl">Libro</p>
        </div>
        <div className="flex gap-4">
          {user ? (
            <Avatar />
          ) : (
            <>
              <Login />
              <SignUp />
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

import logo from "../../assets/img/logo.jpg";
import Button from "../ui/Button";

function Navbar() {
  return (
    <nav className="py-2 px-5 bg-gray-100">
      <div className="max-w-[1200px] flex items-center justify-between mx-auto">
        <div>
          <img className="rounded-lg" width={60} src={logo} alt="book" />
        </div>
        <div className="flex gap-4">
          <Button variant="secondary">Log in</Button>
          <Button>Sign Up</Button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

import { useState } from "react";
import logo from "../../assets/img/logo.jpg";
import Button from "../ui/Button";
import Modal from "../ui/Modal";
import Input from "../ui/Input";
import googleIcon from "../../assets/img/google-icon.webp";
import InputPassword from "../ui/InputPassword";

function Navbar() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);

  return (
    <nav className="py-2 px-5 bg-gray-100 shadow-lg">
      <div className="max-w-[1200px] flex items-center justify-between mx-auto">
        <div className="flex items-center">
          <img className="rounded-lg me-2" width={46} src={logo} alt="book" />
          <p className="font-poetsenOne text-xl">Libro</p>
        </div>
        <div className="flex gap-4">
          <Button variant="secondary" onClick={() => setIsLoginOpen(true)}>
            Log in
          </Button>
          <Button onClick={() => setIsSignUpOpen(true)}>Sign Up</Button>
        </div>
      </div>
      <Modal
        modalTitle="Log in"
        open={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
      >
        <Input type="email" placeholder="Email" />
        <InputPassword
          placeholder="Password"
        />
        <Button className="w-full">Log In</Button>
        <div className="flex items-center w-full">
          <div className="h-[0.5px] w-full bg-gray-200" />
          <span className="px-5">or</span>
          <div className="h-[0.5px] w-full bg-gray-200" />
        </div>
        <Button
          variant="secondary"
          className="w-full border-2 hover:border-black hover:text-black flex items-center justify-center"
        >
          <img className="me-1" width={40} src={googleIcon} alt="google logo" />
          Login with Google
        </Button>
      </Modal>
      <Modal
        modalTitle="Sign Up"
        open={isSignUpOpen}
        onClose={() => setIsSignUpOpen(false)}
      >
        <Input type="text" placeholder="Username" />
        <Input type="email" placeholder="Email" />
        <InputPassword
          placeholder="Password"
        />
        <Button className="w-full">Sign Up</Button>
      </Modal>
    </nav>
  );
}

export default Navbar;

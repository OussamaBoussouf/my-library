import { useToggle } from "../../hooks/useToggle";
import Button from "../ui/Button";
import Input from "../ui/Input";
import InputPassword from "../ui/InputPassword";
import Modal from "../ui/Modal";
import googleIcon from "../../assets/img/google-icon.webp";

function Login() {
  const { toggle: isLoginOpen, toggleExpand } = useToggle();
  return (
    <>
      <Button variant="secondary" onClick={toggleExpand}>
        Log in
      </Button>
      {/* LOGIN MODAL */}
      <Modal modalTitle="Log in" open={isLoginOpen} onClose={toggleExpand}>
        <form className="my-5 text-start mx-auto max-w-[350px] flex flex-col gap-5 ">
          <Input type="email" placeholder="Email" />
          <InputPassword placeholder="Password" />
          <Button className="w-full py-4">Log In</Button>
          <div className="flex items-center w-full">
            <div className="h-[0.5px] w-full bg-gray-200" />
            <span className="px-5">or</span>
            <div className="h-[0.5px] w-full bg-gray-200" />
          </div>
          <Button
            variant="secondary"
            className="w-full border-2 hover:border-black hover:text-black flex items-center justify-center"
          >
            <img
              className="me-1"
              width={40}
              src={googleIcon}
              alt="google logo"
            />
            Login with Google
          </Button>
        </form>
      </Modal>
    </>
  );
}

export default Login;

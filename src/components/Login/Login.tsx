import { useToggle } from "../../hooks/useToggle";
import Button from "../ui/Button";
import Input from "../ui/Input";
import InputPassword from "../ui/InputPassword";
import Modal from "../ui/Modal";
import googleIcon from "../../assets/img/google-icon.webp";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { logInSchema } from "../../utils/schemaValidator";
import { useAuth } from "../../context/authContext";
//Interface
import { UserInfo } from "../../utils/type";


function Login() {
  const { toggle: isLoginOpen, toggleExpand } = useToggle();
  const {login, error, loginWithGoogle, loading} = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserInfo>({ resolver: zodResolver(logInSchema) });

  const onSubmit: SubmitHandler<UserInfo> = (data) => {
    login(data.email, data.password);
  };


  return (
    <>
      <Button variant="secondary" onClick={toggleExpand}>
        Log in
      </Button>
      {/* LOGIN MODAL */}
      <Modal
        modalTitle="Log in"
        open={isLoginOpen}
        onClose={() => {
          toggleExpand();
        }}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="my-5 text-start mx-auto max-w-[350px] flex flex-col gap-5 "
        >
          <div>
            <Input
              {...register("email", { required: true })}
              type="email"
              placeholder="Email"
            />
            <span className="text-red-500">{errors.email?.message}</span>
          </div>
          <div>
            <InputPassword
              {...register("password", { required: true })}
              placeholder="Password"
            />
            <span className="text-red-500">{errors.password?.message}</span>
            <span className="text-red-500">{error}</span>
          </div>
          <Button loading={loading} type="submit" className="w-full py-4">
            Log In
          </Button>
          <div className="flex items-center w-full">
            <div className="h-[0.5px] w-full bg-gray-200" />
            <span className="px-5">or</span>
            <div className="h-[0.5px] w-full bg-gray-200" />
          </div>
        </form>
        <Button
          onClick={loginWithGoogle}
          variant="secondary"
          className="max-w-[350px] w-full mx-auto border-2 hover:border-black hover:text-black flex items-center justify-center"
        >
          <img className="me-1" width={40} src={googleIcon} alt="google logo" />
          Login with Google
        </Button>
      </Modal>
    </>
  );
}

export default Login;

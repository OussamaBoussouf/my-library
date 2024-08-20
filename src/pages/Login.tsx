import { Link } from "react-router-dom";
import googleLogo from "../assets/img/google-icon.webp";
import Input from "../components/ui/Input";
import InputPassword from "../components/ui/InputPassword";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { logInSchema } from "../utils/schemaValidator";
import { UserLogin } from "../utils/type";
import { useAuth } from "../context/authContext";
import Button from "../components/ui/Button";
import { useEffect } from "react";

function Login() {
  const { register, handleSubmit, formState, watch} =
    useForm<UserLogin>({
      resolver: zodResolver(logInSchema),
      defaultValues: {
        email: "",
        password: "",
      },
    });

  const { login, error, resetError, loginWithGoogle, loading } = useAuth();

  const onSubmit: SubmitHandler<UserLogin> = (data) => {
    login(data.email, data.password);
  };

  //RESETING SERVER ERRORS
  useEffect(() => {
    const subscription = watch(() => {
      if (error != " ") {
        resetError();
      }
    });
    return () => {
      subscription.unsubscribe();
      resetError();
    };
  }, [watch]);

  return (
    <div className="bg-[url('/images/background-library.webp')] bg-blend-darken h-screen w-full grid place-content-center bg-transparent-black bg-cover bg-center">
      <div className="bg-black text-white w-[90vw] max-w-[450px] text-center px-10 py-5 rounded-xl">
        <h2 className="font-bold text-xl mb-2">Sign in to libro</h2>
        <p className="text-slate-300">Please sign in to continue</p>
        <button
          onClick={loginWithGoogle}
          className="flex items-center justify-center my-4 mx-auto hover:bg-slate-300 border-[2px] border-slate-300 p-1 rounded-md"
        >
          <img
            width={50}
            height={50}
            className="w-[50px] h-[50px]"
            src={googleLogo}
            alt="google logo"
          />
        </button>
        <span className="text-gray-300">or</span>
        <form onSubmit={handleSubmit(onSubmit)} className="text-left my-8">
          <div className="mb-7">
            <label htmlFor="email">Email address</label>
            <Input
              label="Enter your email"
              {...register("email", { required: true })}
              name="email"
              id="email"
            />
            <span className="text-red-500">
              {formState.errors.email?.message}
            </span>
          </div>
          <div className="mb-5">
            <label htmlFor="password">Password</label>
            <InputPassword {...register("password", { required: true })} />
            <span className="text-red-500">
              {formState.errors.password?.message}
              <span className="text-red-500">{error}</span>
            </span>
          </div>
          <Button loading={loading} type="submit">
            SIGN IN
          </Button>
        </form>
        <p>
          Dont have an account ?
          <Link to="/sign-up" className="text-orange-400">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;

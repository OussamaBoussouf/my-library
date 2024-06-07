import { SubmitHandler, useForm } from "react-hook-form";
import Input from "../components/ui/Input";
import InputPassword from "../components/ui/InputPassword";
import { Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "../utils/schemaValidator";
import { UserInfo } from "../utils/type";
import Button from "../components/ui/Button";
import { useAuth } from "../context/authContext";
import { useEffect } from "react";

function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm<UserInfo>({ resolver: zodResolver(signUpSchema) });

  const { signUp, error, resetError, loading } = useAuth();

  const onSubmit: SubmitHandler<UserInfo> = (data) => {
    signUp(data.email, data.password, data.username);
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
    <div>
      <div className="bg-[url('/images/background-image.png')] bg-blend-darken h-screen w-full grid place-content-center bg-transparent-black bg-cover bg-center">
        <div className="bg-black text-white w-[90vw] max-w-[450px] text-center px-10 py-5 rounded-xl">
          <h2 className="font-bold text-xl mb-2">Create your account</h2>
          <p className="text-slate-300">
            Welcome! Please fill in the details to get started.
          </p>
          <form onSubmit={handleSubmit(onSubmit)} className="text-left my-8">
            <div className="mb-7">
              <label htmlFor="username">Username</label>
              <Input
                {...register("username", { required: true })}
                name="username"
                id="username"
              />
              <span className="text-red-500">{errors.username?.message}</span>
            </div>
            <div className="mb-7">
              <label htmlFor="email">Email address</label>
              <Input
                {...register("email", { required: true })}
                name="email"
                id="email"
              />
              <span className="text-red-500">{errors.email?.message}</span>
            </div>
            <div className="mb-5">
              <label htmlFor="email">Password</label>
              <InputPassword {...register("password", { required: true })} />
              <span className="text-red-500">{errors.password?.message}</span>
              <span className="text-red-500">{error}</span>
            </div>
            <Button loading={loading} type="submit">
              SIGN UP
            </Button>
          </form>
          <p>
            Already have an account ?{" "}
            <Link to="/sign-in" className="text-orange-400">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;

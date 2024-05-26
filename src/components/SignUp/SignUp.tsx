import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useToggle } from "../../hooks/useToggle";
import Button from "../ui/Button";
import Input from "../ui/Input";
import InputPassword from "../ui/InputPassword";
import Modal from "../ui/Modal";
import { useState } from "react";
import { auth, db } from "../../firestore";
import { doc, setDoc } from "firebase/firestore";
import { FirebaseError } from "firebase/app";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { signUpSchema } from "../../utils/schemaValidator";

interface UserInfo {
  user_name: string;
  email: string;
  password: string;
}


function SignUp() {
  const { toggle: isSignUpOpen, toggleExpand } = useToggle();
  const [authError, setAuthError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserInfo>({ resolver: zodResolver(signUpSchema) });

  const onSubmit: SubmitHandler<UserInfo> = (data) => {
    createUser(data);
  };

  const createUser = async (user: UserInfo) => {
    try {
      setIsLoading(true);
      const credential = await createUserWithEmailAndPassword(
        auth,
        user.email,
        user.password,
      );
      await updateProfile(credential.user, {displayName: user.user_name})
      const userId = credential.user.uid;
      const userRecord = {
        email: user.email,
        books: [],
        favorites: [],
        trash: [],
      };
      await setDoc(doc(db, "users", userId), userRecord);
      toast.success("Your account has been created successfully");
      setIsLoading(false);
      reset();
    } catch (err) {
      if (err instanceof FirebaseError) {
        if (err.code == "auth/email-already-in-use") {
          setAuthError("This email is already used");
        }
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      <Button onClick={toggleExpand}>Sign Up</Button>
      <Modal
        modalTitle="Sign Up"
        open={isSignUpOpen}
        onClose={() => {
          toggleExpand();
        }}
      >
        <form
          className="my-5 text-start mx-auto max-w-[350px] flex flex-col gap-5 "
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <Input
              {...register("user_name", { required: true })}
              type="text"
              placeholder="Username"
            />
            <span className="text-red-500">{errors.user_name?.message}</span>
          </div>
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
            {authError && <span className="text-red-500">{authError}</span>}
          </div>
          <Button
            type="submit"
            className="w-full py-4"
            loading={isLoading}
          >
            Sign Up
          </Button>
        </form>
      </Modal>
    </>
  );
}

export default SignUp;

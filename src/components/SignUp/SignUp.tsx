import { useToggle } from "../../hooks/useToggle";
import Button from "../ui/Button";
import Input from "../ui/Input";
import InputPassword from "../ui/InputPassword";
import Modal from "../ui/Modal";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "../../utils/schemaValidator";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../../firestore";
import { doc, setDoc } from "firebase/firestore";
import { FirebaseError } from "firebase/app";
import { useState } from "react";
import { useAuth } from "../../context/authContext";
import { UserInfo } from "../../utils/type";

function SignUp() {
  const { toggle: isSignUpOpen, toggleExpand } = useToggle();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const {logOut} = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<UserInfo>({ resolver: zodResolver(signUpSchema) });

  const onSubmit: SubmitHandler<UserInfo> = (data) => {
    createUser(data.email, data.password, data.name);
  };
  const createUser = async (
    email: string,
    password: string,
    userName: string
  ) => {
    try {
      setLoading(true);
      const credential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      logOut();
      await updateProfile(credential.user, {
        displayName: userName,
      });
      const userRecord = {
        email: email,
        name: userName,
      };
      await setDoc(doc(db, "users", credential.user.uid), userRecord);
      setLoading(false);
      setError("");
    } catch (err) {
      if (err instanceof FirebaseError) {
        if (err.code == "auth/email-already-in-use") {
          setError("This email is already used");
        }
        setLoading(false);
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
              {...register("name", { required: true })}
              type="text"
              placeholder="Username"
            />
            <span className="text-red-500">{errors.name?.message}</span>
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
            {error && <span className="text-red-500">{error}</span>}
          </div>
          <Button type="submit" className="w-full py-4" loading={loading}>
            Sign Up
          </Button>
        </form>
      </Modal>
    </>
  );
}

export default SignUp;

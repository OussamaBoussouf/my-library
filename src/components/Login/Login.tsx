import { useToggle } from "../../hooks/useToggle";
import Button from "../ui/Button";
import Input from "../ui/Input";
import InputPassword from "../ui/InputPassword";
import Modal from "../ui/Modal";
import googleIcon from "../../assets/img/google-icon.webp";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { SubmitHandler, useForm } from "react-hook-form";
import { auth, db } from "../../firestore";
import { zodResolver } from "@hookform/resolvers/zod";
import { FirebaseError } from "firebase/app";
import { useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { logInSchema } from "../../utils/schemaValidator";

interface UserInfo {
  email: string;
  password: string;
}


function Login() {
  const { toggle: isLoginOpen, toggleExpand } = useToggle();
  const [authError, setAuthError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserInfo>({ resolver: zodResolver(logInSchema) });

  const onSubmit: SubmitHandler<UserInfo> = (data) => {
    loginEmailPassword(data);
  };

  const loginEmailPassword = async (user: UserInfo) => {
    try {
      setIsLoading(true);
      await signInWithEmailAndPassword(auth, user.email, user.password);
      setIsLoading(false);
    } catch (err) {
      if (err instanceof FirebaseError) {
        if (err.code === "auth/invalid-credential") {
          setIsLoading(false);
          setAuthError("This credential doesn't exist");
        }
      }
    }
  };

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: "select_account",
    });
    try {
      const result = await signInWithPopup(auth, provider);
      GoogleAuthProvider.credentialFromResult(result);
      const docRef = doc(db, "users", result.user.uid);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        const userRecord = {
          email: result.user.email,
          books: [],
          favorites: [],
          trash: [],
        };
        await setDoc(doc(db, "users", result.user.uid), userRecord);
      }
    } catch (error) {
      if (error instanceof FirebaseError) {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData?.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      }
    }
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
          if (authError != "") setAuthError("");
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
            <span className="text-red-500">{authError}</span>
          </div>
          <Button loading={isLoading} type="submit" className="w-full py-4">
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

import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { auth, db } from "../firestore";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { FirebaseError } from "firebase/app";
import { Context } from "../utils/type";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const AuthContext = createContext<Context | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();


  const resetError = () => {
    setError("");
  }

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard/home");
      setLoading(false);
    } catch (err) {
      if (err instanceof FirebaseError) {
        if (err.code === "auth/invalid-credential") {
          setError(
            "This credential doesn't exist or the password is incorrect"
          );
          setLoading(false);
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
          name: result.user.displayName,
        };
        await setDoc(doc(db, "users", result.user.uid), userRecord);
      }
      navigate("/dashboard/home");
    } catch (error) {
      if (error instanceof FirebaseError) {
        console.log(error);
      }
    }
  };

  const signUp = async (email: string, password: string, username: string) => {
    try {
      setLoading(true);
      const credential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      logOut();
      await updateProfile(credential.user, {
        displayName: username,
      });
      const userRecord = {
        email: email,
        username: username,
      };
      await setDoc(doc(db, "users", credential.user.uid), userRecord);
      setLoading(false);
      setError("");
      toast.success("Your account has been created");
      navigate("/sign-in");
    } catch (err) {
      if (err instanceof FirebaseError) {
        if (err.code == "auth/email-already-in-use") {
          setError("This email is already used");
        }
        setLoading(false);
      }
    }
  };

  const logOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userInfo) => {
      if (userInfo) {
        localStorage.setItem(
          "user",
          JSON.stringify({
            uid: userInfo.uid,
            name: userInfo.displayName as string,
          })
        );
      } else {
        localStorage.removeItem("user");
      }
    });
    return () => unsubscribe();
  }, []);


  const allValue = {
    loading,
    error,
    resetError,
    login,
    loginWithGoogle,
    logOut,
    signUp
  };

  return (
    <AuthContext.Provider value={allValue}>{children}</AuthContext.Provider>
  );
};

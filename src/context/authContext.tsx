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
import { Context, User } from "../utils/type";
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
  const [user, setUser] = useState<User | null>(
    JSON.parse(localStorage.getItem("user") as string) || null
  );
  const navigate = useNavigate();
  const resetError = () => {
    setError("");
  };

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      if (err instanceof FirebaseError) {
        if (err.code === "auth/invalid-credential") {
          setError(
            "This credential doesn't exist or the password is incorrect"
          );
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
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
      navigate("/dashboard");
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
      await updateProfile(credential.user, {
        displayName: username,
      });
      const userRecord = {
        email: email,
        username: username,
      };
      await setDoc(doc(db, "users", credential.user.uid), userRecord);
      setError("");
      toast.success("Your account has been created successfuly");
    } catch (err) {
      if (err instanceof FirebaseError) {
        if (err.code == "auth/email-already-in-use") {
          setError("This email is already used");
        } else {
          toast.error("Something went wrong");
        }
      }
    } finally {
      setLoading(false);
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
          })
        );
        setUser({ uid: userInfo.uid });
        navigate("/dashboard");
      } else {
        localStorage.removeItem("user");
        setUser(null);
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, []);

  const allValue = {
    loading,
    error,
    user,
    resetError,
    login,
    loginWithGoogle,
    logOut,
    signUp,
  };

  return (
    <AuthContext.Provider value={allValue}>{children}</AuthContext.Provider>
  );
};

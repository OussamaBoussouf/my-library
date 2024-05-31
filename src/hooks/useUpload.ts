import { useState } from "react";
import { generateString } from "../utils/randomString";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { auth, db, storage } from "../firestore";
import { addDoc, collection } from "firebase/firestore";
import { FirebaseError } from "firebase/app";
import { Data } from "../utils/type";

export const useUpload = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const upload = async (entry: Data) => {
    const bookRecord = new Map();
    try {
      setLoading(true);
      for (const [key, value] of Object.entries(entry)) {
        if (value instanceof FileList) {
          if (value[0].type.includes("image")) {
            const imageRef = generateString(8);
            const imageUrl = await uploadFile(value[0], "images/" + imageRef);
            bookRecord.set("imageUrl", imageUrl);
            bookRecord.set("imageRef", imageRef);
          } else {
            const fileRef = generateString(8);
            const fileUrl = await uploadFile(value[0], "files/" + fileRef);
            bookRecord.set("fileUrl", fileUrl);
            bookRecord.set("fileRef", fileRef);
          }
        } else {
          bookRecord.set(key, value);
        }
      }
      const bookRef = collection(db, "users", `${auth.currentUser?.uid}`, "books");
      const docRecord = Object.fromEntries(bookRecord);
      await addDoc(bookRef, docRecord);
      setLoading(false);
    } catch (err) {
      console.log(err);
      if (err instanceof FirebaseError) {
        setError(err.message);
      }
      setLoading(false);
    }
  };

  const value = {
    loading,
    error,
    upload,
  };

  return value;
};

const uploadFile = async (file: File, path: string) => {
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, file);
  return getDownloadURL(storageRef);
};

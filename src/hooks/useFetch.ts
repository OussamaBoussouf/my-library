import { useEffect, useState } from "react";
import { db, storage } from "../firestore";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { InfoBook } from "../utils/type";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { deleteObject, ref } from "firebase/storage";

export const useFetch = () => {
  const user = JSON.parse(localStorage.getItem("user") as string);
  const [loading, setLoading] = useState(false);
  const [cloneData, setCloneData] = useState<InfoBook[]>([]);
  const [data, setData] = useState<InfoBook[]>([]);
  const [isEmpty, setIsEmpty] = useState(false);
  const [hasNoBooks, setHasNoBooks] = useState(false);
  const location = useLocation().pathname;

  let dataQuery;
  switch (location) {
    case "/dashboard/favorite":
      dataQuery = query(
        collection(db, "users", user?.uid, "books"),
        where("favorite", "==", true),
        where("trash", "==", false),
        orderBy("createdAt")
      );
      break;
    case "/dashboard/trash":
      dataQuery = query(
        collection(db, "users", user?.uid, "books"),
        where("trash", "==", true),
        orderBy("createdAt")
      );
      break;
    default:
      dataQuery = query(
        collection(db, "users", user?.uid, "books"),
        where("trash", "==", false),
        orderBy("createdAt")
      );
      break;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsEmpty(false);
        setHasNoBooks(false);
        setLoading(true);
        setData([]);

        const books: InfoBook[] = [];
        const querySnapshot = await getDocs(dataQuery);
        if (!querySnapshot.empty) {
          querySnapshot.forEach((doc) => {
            books.push(doc.data() as InfoBook);
          });
          setData(books);
          setHasNoBooks(false);
          setCloneData(books);
          setLoading(false);
        } else {
          setHasNoBooks(true);
          setLoading(false);
        }
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };

    if (location != "/dashboard/create-book") fetchData();
  }, [location]);

  // SELECT CATEGORY
  const selectCat = async (category: string, bookCollection: string) => {
    const books: InfoBook[] = [];

    if (hasNoBooks) setHasNoBooks(false);

    try {
      let q;
      setData([]);
      setLoading(true);
      if (category === "all" && bookCollection !== "") {
        q = query(
          collection(db, "users", user!.uid, "books"),
          orderBy("createdAt"),
          where(bookCollection, "==", true)
        );
      } else if (category === "all" && bookCollection === "") {
        q = query(
          collection(db, "users", user!.uid, "books"),
          orderBy("createdAt"),
          where("trash", "==", false)
        );
      } else if (category !== "all" && bookCollection === "") {
        q = query(
          collection(db, "users", user!.uid, "books"),
          orderBy("createdAt"),
          where("category", "==", category),
          where("trash", "==", false)
        );
      } else {
        q = query(
          collection(db, "users", user!.uid, "books"),
          orderBy("createdAt"),
          where("category", "==", category),
          where(bookCollection, "==", true)
        );
      }
      const documents = await getDocs(q);
      documents.forEach((doc) => {
        books.push(doc.data() as InfoBook);
      });

      // WHENE YOU SELECT CATEGORY THAT HAS NO BOOKS
      if (books.length == 0) {
        setHasNoBooks(true);
        setLoading(false);
        if (data.length != 0) setData([]);
        return;
      }

      if (isEmpty) setIsEmpty(false);
      setLoading(false);
      setData(books);
      setCloneData(books);
    } catch (err) {
      setLoading(false);
      console.error(err);
    }
  };

  // SEARCH FOR KEYWORD
  const search = (keyword: string) => {
    if (hasNoBooks) return;

    const books: InfoBook[] = cloneData.filter((book) =>
      book.title.includes(keyword.toLowerCase())
    );

    if (books.length == 0) {
      setIsEmpty(true);
    } else {
      if (isEmpty) setIsEmpty(false);
    }
    setData(books);
  };

  const moveToTrash = async (docId: string) => {
    try {
      const docRef = doc(db, `users/${user?.uid}/books`, docId);
      await updateDoc(docRef, { trash: true, favorite: false });
      if (data.length == 1) setHasNoBooks(true);
      setData((prev) => prev.filter((book) => book.id != docId));
      toast.success("This book has been moved to trash");
    } catch (err) {
      console.log(err);
    }
  };

  const addToFavorite = async (docId: string) => {
    try {
      const docRef = doc(db, `users/${user?.uid}/books`, docId);
      const book = await getDoc(docRef);
      const bookInfo = book.data() as InfoBook;
      if (bookInfo.favorite) {
        toast.error("This book is already in your favorite");
      } else {
        await updateDoc(docRef, { favorite: true });
        toast.success("This book has been added to favorite");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const removeFromFavorite = async (docId: string) => {
    try {
      const docRef = doc(db, `users/${user?.uid}/books`, docId);
      await updateDoc(docRef, { favorite: false });
      if (data.length == 1) setHasNoBooks(true);
      setData((prev) => prev.filter((book) => book.id != docId));
      toast.success("This book has been removed from favorite");
    } catch (err) {
      console.log(err);
    }
  };

  const restoreBook = async (docId: string) => {
    try {
      const docRef = doc(db, `users/${user?.uid}/books`, docId);
      await updateDoc(docRef, { trash: false });
      if (data.length == 1) setHasNoBooks(true);
      setData((prev) => prev.filter((book) => book.id != docId));
      toast.success("This book has been restored");
    } catch (err) {
      console.log(err);
    }
  };

  const deleteBook = async (document: InfoBook) => {
    try {
      const imageRef = ref(storage, "images/" + document.imageRef);
      const fileRef = ref(storage, "files/" + document.fileRef);
      await deleteObject(imageRef);
      await deleteObject(fileRef);
      await deleteDoc(doc(db, `users/${user?.uid}/books`, document.id));
      setData((prev) => prev.filter((book) => book.id != document.id));
      toast.success("This book has been deleted successfully");
    } catch (err) {
      toast.error("Ops something went wrong");
      console.log(err);
    }
  };

  const value = {
    data,
    selectCat,
    search,
    moveToTrash,
    addToFavorite,
    removeFromFavorite,
    deleteBook,
    restoreBook,
    loading,
    isEmpty,
    hasNoBooks,
  };

  return value;
};

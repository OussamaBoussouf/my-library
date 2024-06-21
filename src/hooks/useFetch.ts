import { useEffect, useState } from "react";
import { db } from "../firestore";
import {
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { InfoBook } from "../utils/type";
import { useLocation } from "react-router-dom";

export const useFetch = () => {
  const [loading, setLoading] = useState(false);
  const [cloneData, setCloneData] = useState<InfoBook[]>([]);
  const [data, setData] = useState<InfoBook[]>([]);
  const [isEmpty, setIsEmpty] = useState(false);
  const [hasNoBooks, setHasNoBooks] = useState(false);
  const user = JSON.parse(localStorage.getItem("user") as string);
  const location = useLocation().pathname;

  useEffect(() => {
    if (location != "/dashboard/create-book") {
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
      if (hasNoBooks) setHasNoBooks(false);
      if (isEmpty) setIsEmpty(false);
      setLoading(true);
      setData([]);
      const unsubscribe = onSnapshot(dataQuery, (querySnapshot) => {
        const books: InfoBook[] = [];
        querySnapshot.forEach((doc) => {
          books.push(doc.data() as InfoBook);
        });
        if (books.length == 0) setHasNoBooks(true);
        setData(books);
        setCloneData(books);
        setLoading(false);
      });

      return () => unsubscribe();
    }
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
          collection(db, "users", user?.uid, "books"),
          orderBy("createdAt"),
          where(bookCollection, "==", true)
        );
      } else if (category === "all" && bookCollection === "") {
        q = query(
          collection(db, "users", user?.uid, "books"),
          orderBy("createdAt"),
          where("trash", "==", false)
        );
      } else if (category !== "all" && bookCollection === "") {
        q = query(
          collection(db, "users", user?.uid, "books"),
          orderBy("createdAt"),
          where("category", "==", category),
          where("trash", "==", false)
        );
      } else {
        q = query(
          collection(db, "users", user?.uid, "books"),
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
      book.title.includes(keyword)
    );

    if (books.length == 0) {
      setIsEmpty(true);
    } else {
      if (isEmpty) setIsEmpty(false);
    }
    setData(books);
  };

  const value = { data, selectCat, search, loading, isEmpty, hasNoBooks };

  return value;
};

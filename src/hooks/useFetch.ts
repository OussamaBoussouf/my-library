// hook should return data, loading, error

import { useEffect, useState } from "react";
import { auth, db } from "../firestore";
import {
  DocumentData,
  collection,
  getCountFromServer,
  getDocs,
  limit,
  query,
  startAfter,
} from "firebase/firestore";

let totalLength: number;

export const useFetch = (pageSize: number) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<DocumentData[]>([]);
  const [lastVisible, setLastVisible] = useState<DocumentData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (auth.currentUser?.uid) {
        try {
          const allData: DocumentData[] = [];
          const books = query(
            collection(db, "users", `${auth.currentUser?.uid}`, "books"),
            limit(pageSize)
          );
          const documents = await getDocs(books);
          documents.forEach((doc) => {
            allData.push(doc.data());
          });
          const totalData = await getCountFromServer(
            collection(db, "users", `${auth.currentUser?.uid}`, "books")
          );
          totalLength = totalData.data().count;
          setLastVisible(documents.docs[documents.docs.length - 1]);
          setData(allData);
          setLoading(false);
        } catch (err) {
          console.log(err);
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [auth.currentUser?.uid]);

  const nextPage = async () => {
    const newData: DocumentData[] = [];
    try {
      const next = query(
        collection(db, "users", `${auth.currentUser?.uid}`, "books"),
        startAfter(lastVisible),
        limit(pageSize)
      );
      const bookDocs = await getDocs(next);
      bookDocs.forEach((doc) => {
        newData.push(doc.data() as DocumentData);
      });
      const newVisibles = bookDocs.docs[bookDocs.docs.length - 1];
      setLastVisible(newVisibles);
      setData([...data, ...newData]);
    } catch (err) {
      console.log(err);
    }
  };

  const value = {
    loading,
    data,
    lastVisible,
    totalLength,
    nextPage,
  };

  return value;
};

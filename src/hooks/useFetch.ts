// hook should return data, loading, error

import { useEffect, useState } from "react";
import { auth, db } from "../firestore";
import {
  DocumentData,
  collection,
  endAt,
  getCountFromServer,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  startAt,
  where,
} from "firebase/firestore";

let totalLength: number;

export const useFetch = (pageSize: number, select: string) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<DocumentData[]>([]);
  const [lastVisible, setLastVisible] = useState<DocumentData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        console.log(select);
        let q, totalData;
        const allData: DocumentData[] = [];
        const booksRef = collection(
          db,
          "users",
          `${auth.currentUser?.uid}`,
          "books"
        );
        if (select === "") {
          q = query(booksRef, orderBy("title"), limit(pageSize));
          totalData = await getCountFromServer(booksRef);
        } else {
          q = query(
            booksRef,
            orderBy("title"),
            where("category", "==", select),
            limit(pageSize)
          );
          totalData = await getCountFromServer(
            query(booksRef, where("category", "==", select))
          );
        }
        const documents = await getDocs(q);
        documents.forEach((doc) => {
          allData.push(doc.data());
        });
        totalLength = totalData.data().count;
        setLastVisible(documents.docs[documents.docs.length - 1]);
        setData(allData);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };

    fetchData();
  }, [auth.currentUser, select]);

  const nextPage = async () => {
    const newData: DocumentData[] = [];
    try {
      let next;
      const booksRef = collection(
        db,
        "users",
        `${auth.currentUser?.uid}`,
        "books"
      );
      if (select === "") {
        next = query(booksRef,orderBy("title"), startAfter(lastVisible), limit(pageSize));
      } else {
        next = query(
          booksRef,
          orderBy("title"),
          startAfter(lastVisible),
          where("category", "==", select),
          limit(pageSize)
        );
      }
      const bookDocs = await getDocs(next);
      bookDocs.forEach((doc) => {
        newData.push(doc.data() as DocumentData);
      });
      const newVisibles = bookDocs.docs[bookDocs.docs.length - 1];
      console.log(newVisibles);
      setLastVisible(newVisibles);
      setData([...data, ...newData]);
    } catch (err) {
      console.log(err);
    }
  };

  const search = async (keyword: string) => {
    let q, totalData;
    const allData: DocumentData[] = [];
    const booksRef = collection(
      db,
      "users",
      `${auth.currentUser?.uid}`,
      "books"
    );
    if (select === "") {
      q = query(
        booksRef,
        orderBy("title"),
        startAt(keyword),
        endAt(keyword + "\uf8ff"),
        limit(pageSize)
      );
      totalData = await getCountFromServer(
        query(
          booksRef,
          orderBy("title"),
          startAt(keyword),
          endAt(keyword + "\uf8ff")
        )
      );
    } else {
      q = query(
        booksRef,
        orderBy("title"),
        startAt(keyword),
        endAt(keyword + "\uf8ff"),
        where("category", "==", select),
        limit(pageSize)
      );
      totalData = await getCountFromServer(
        query(
          booksRef,
          orderBy("title"),
          startAt(keyword),
          where("category", "==", select),
          endAt(keyword + "\uf8ff")
        )
      );
    }
    totalLength = totalData.data().count;
    const documents = await getDocs(q);
    documents.forEach((doc) => {
      allData.push(doc.data());
    });
    console.log(allData);
    console.log(totalLength);
    const newVisibles = documents.docs[documents.docs.length - 1];
    setLastVisible(newVisibles);
    setData(allData);
  };

  const value = {
    loading,
    data,
    lastVisible,
    totalLength,
    nextPage,
    search,
  };

  return value;
};

import {
  collection,
  deleteDoc,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db, storage } from "../firestore";
import { deleteObject, ref } from "firebase/storage";
import { artificialDelay } from "../utils/delay";

const user = JSON.parse(localStorage.getItem("user") as string);

const getAllBooks = async () => {
  const data = query(
    collection(db, "users", user?.uid, "books"),
    where("trash", "==", false),
    orderBy("createdAt")
  );

  await artificialDelay(1500);

  const books = await getDocs(data);

  return books.docs.map((book) => book.data());
};

const getFavoriteBooks = async () => {
  const data = query(
    collection(db, "users", user?.uid, "books"),
    where("favorite", "==", true),
    orderBy("createdAt")
  );

  await artificialDelay(1500);

  const books = await getDocs(data);

  return books.docs.map((book) => book.data());
};

const getBooksInTrash = async () => {
  const data = query(
    collection(db, "users", user?.uid, "books"),
    where("trash", "==", true),
    orderBy("createdAt")
  );

  await artificialDelay(1500);

  const books = await getDocs(data);

  return books.docs.map((book) => book.data());
};

const moveToTrash = async (bookId: string) => {
  const book = doc(db, `users/${user?.uid}/books`, bookId);
  await updateDoc(book, { trash: true, favorite: false });
};

const addToFavorite = async (bookId: string) => {
  const bookAsDoc = doc(db, `users/${user?.uid}/books`, bookId);
  const book = await getDoc(bookAsDoc);
  if ((book.data() as DocumentData).favorite) {
    throw new Error("This book is already in your favorite");
  }
  await updateDoc(bookAsDoc, { favorite: true });
};

const restoreBook = async (bookId: string) => {
  const book = doc(db, `users/${user?.uid}/books`, bookId);
  await updateDoc(book, { trash: false });
};

const removeFromFavorite = async (bookId: string) => {
  const book = doc(db, `users/${user?.uid}/books`, bookId);
  await updateDoc(book, { favorite: false });
};

const deleteBook = async (bookDoc: DocumentData) => {
  const imageRef = ref(storage, "images/" + bookDoc.imageRef);
  const fileRef = ref(storage, "files/" + bookDoc.fileRef);
  const document = doc(db, `users/${user?.uid}/books`, bookDoc.id);

  Promise.all([
    deleteObject(imageRef),
    deleteObject(fileRef),
    deleteDoc(document),
  ]);
};

export {
  getAllBooks,
  getFavoriteBooks,
  getBooksInTrash,
  addToFavorite,
  moveToTrash,
  restoreBook,
  removeFromFavorite,
  deleteBook,
};

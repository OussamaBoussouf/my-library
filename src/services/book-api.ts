import {
  collection,
  deleteDoc,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db, storage } from "../firestore";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { artificialDelay } from "../utils/delay";
import { IBook } from "../utils/type";
import { generateString } from "../utils/randomString";

//FETCHING DATA
const getAllBooks = async (user: { uid: string } | null) => {
  if (user === null) return;

  const data = query(
    collection(db, "users", user?.uid, "books"),
    where("trash", "==", false),
    orderBy("createdAt")
  );

  await artificialDelay(1500);

  const books = await getDocs(data);

  return books.docs.map((book) => book.data());
};

const getFavoriteBooks = async (user: { uid: string } | null) => {
  if (user === null) return;

  const data = query(
    collection(db, "users", user?.uid, "books"),
    where("favorite", "==", true),
    orderBy("createdAt")
  );

  await artificialDelay(1500);

  const books = await getDocs(data);

  return books.docs.map((book) => book.data());
};

const getBooksInTrash = async (user: { uid: string } | null) => {
  if (user === null) return;

  const data = query(
    collection(db, "users", user?.uid, "books"),
    where("trash", "==", true),
    orderBy("createdAt")
  );

  await artificialDelay(1500);

  const books = await getDocs(data);

  return books.docs.map((book) => book.data());
};

//MUTATION ACTION
const moveToTrash = async (bookId: string) => {
  const user = JSON.parse(localStorage.getItem("user") as string);
  const book = doc(db, `users/${user?.uid}/books`, bookId);
  await updateDoc(book, { trash: true, favorite: false });
};

const addToFavorite = async (bookId: string) => {
  const user = JSON.parse(localStorage.getItem("user") as string);
  const bookAsDoc = doc(db, `users/${user?.uid}/books`, bookId);
  const book = await getDoc(bookAsDoc);
  if ((book.data() as DocumentData).favorite) {
    throw new Error("This book is already in your favorite");
  }
  await updateDoc(bookAsDoc, { favorite: true });
};

const restoreBook = async (bookId: string) => {
  const user = JSON.parse(localStorage.getItem("user") as string);
  const book = doc(db, `users/${user?.uid}/books`, bookId);
  await updateDoc(book, { trash: false });
};

const removeFromFavorite = async (bookId: string) => {
  const user = JSON.parse(localStorage.getItem("user") as string);
  const book = doc(db, `users/${user?.uid}/books`, bookId);
  await updateDoc(book, { favorite: false });
};

const deleteBook = async (bookDoc: DocumentData) => {
  const user = JSON.parse(localStorage.getItem("user") as string);
  const imageRef = ref(storage, "images/" + bookDoc.imageRef);
  const fileRef = ref(storage, "files/" + bookDoc.fileRef);
  const document = doc(db, `users/${user?.uid}/books`, bookDoc.id);

  await Promise.all([
    deleteObject(imageRef),
    deleteObject(fileRef),
    deleteDoc(document),
  ]);
};

const uploadBook = async (data: IBook) => {
  const user = JSON.parse(localStorage.getItem("user") as string);
  const { image, pdf, title, category } = data;

  const docId = generateString(20);
  const imageRef = generateString(8);
  const fileRef = generateString(8);

  const [imageUrl, fileUrl] = await Promise.all([
    uploadFileToFireStorage(image[0], `images/${imageRef}`),
    uploadFileToFireStorage(pdf[0], `files/${fileRef}`),
  ]);

  const book = {
    id: docId,
    trash: false,
    favorite: false,
    fileUrl,
    fileRef,
    imageUrl,
    imageRef,
    createdAt: serverTimestamp(),
    category,
    title: title.toLowerCase(),
  };

  await setDoc(doc(db, `users/${user.uid}/books/${docId}`), book);
};

const uploadFileToFireStorage = async (file: File, path: string) => {
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, file);
  return getDownloadURL(storageRef);
};

export {
  uploadBook,
  getAllBooks,
  getFavoriteBooks,
  getBooksInTrash,
  addToFavorite,
  moveToTrash,
  restoreBook,
  removeFromFavorite,
  deleteBook,
};

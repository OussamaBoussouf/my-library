import { useContext, useEffect, useState } from "react";
import Book from "../../components/Book/Book";
import UploadModal from "../../components/Upload_Modal/UploadModal";
import {
  DocumentData,
  collection,
  getCountFromServer,
  getDocs,
  limit,
  query,
  startAfter,
} from "firebase/firestore";
import { db } from "../../firestore";
import { AuthContext } from "../../context/authContext";
import Button from "../../components/ui/Button";

interface IAllBooks {
  category: string;
  title: string;
  imageUrl: string;
  pdfUrl: string;
}

interface User {
  uid: string;
  name: string;
}

const PAGE_SIZE = 6;

function AllBooks() {
  const [allBooks, setAllBooks] = useState<IAllBooks[]>([]);
  const user = useContext<User | null>(AuthContext);
  const [loading, setLoading] = useState(false);
  const [lastVisible, setLastVisible] = useState<DocumentData | null>(null);
  const [loadBook, setLoadBook] = useState(false);
  const [count, setCount] = useState<number | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        if (user) {
          const allData: IAllBooks[] = [];
          const books = query(
            collection(db, "users", `${user?.uid}`, "books"),
            limit(PAGE_SIZE)
          );
          const documents = await getDocs(books);
          documents.forEach((doc) => {
            allData.push(doc.data() as IAllBooks);
          });
          getCount();
          setLastVisible(documents.docs[documents.docs.length - 1]);
          setAllBooks(allData);
        }
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
    };
    fetchData();
  }, [user]);

  const loadMoreBook = async () => {
    const newData: IAllBooks[] = [];
    try {
      setLoadBook(true);
      const next = query(
        collection(db, "users", `${user?.uid}`, "books"),
        startAfter(lastVisible),
        limit(PAGE_SIZE)
      );
      const bookDocs = await getDocs(next);
      bookDocs.forEach((doc) => {
        newData.push(doc.data() as IAllBooks);
      });
      const newVisibles = bookDocs.docs[bookDocs.docs.length - 1];
      setLastVisible(newVisibles);
      setAllBooks([...allBooks, ...newData]);
      setLoadBook(false);
    } catch (err) {
      console.log(err);
      setLoadBook(false);
    }
  };

  const getCount = async () => {
    const books = collection(db, "users", `${user?.uid}`, "books");
    const snapshot = await getCountFromServer(books);
    setCount(snapshot.data().count);
  };

  return (
    <>
      <div className="flex justify-between px-5">
        <h2 className="text-4xl font-poetsenOne">All Books</h2>
        <UploadModal />
      </div>
      <div className="grid grid-cols-fill gap-x-3 gap-y-10 justify-items-center py-10">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            {allBooks?.map((book, index) => (
              <Book
                key={index}
                image={book.imageUrl}
                pdf={book.pdfUrl}
                title={book.title}
              />
            ))}
          </>
        )}
      </div>
      {count != null && allBooks.length < count && (
        <div className="flex justify-center py-5">
          <Button loading={loadBook} onClick={loadMoreBook}>Loading more</Button>
        </div>
      )}
    </>
  );
}

export default AllBooks;

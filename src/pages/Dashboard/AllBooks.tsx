import {useEffect} from "react";
import Book from "../../components/Book/Book";
import Button from "../../components/ui/Button";
import { useFetch } from "../../hooks/useFetch";
import { useDebounce } from "../../hooks/useDebounce";

const PAGE_SIZE = 4;

function AllBooks({
  selectedCat,
  searchTerm,
  subCollection,
}: {
  selectedCat: string;
  searchTerm: string;
  subCollection: string;
}) {
  const debouncedSearchTerm = useDebounce(searchTerm, 800);
  const {
    data: books,
    loading,
    nextPage,
    totalLength: count,
    search,
  } = useFetch(PAGE_SIZE, selectedCat, subCollection);

  useEffect(() => {
    search(searchTerm);
    console.log("searching...");
  }, [debouncedSearchTerm]);

  return (
    <>
      {loading ? (
        <p className="ps-5 mt-5">Loading...</p>
      ) : books.length === 0 ? (
        <p className="ps-5 mt-5">Sorry you have no book</p>
      ) : (
        <div className="grid grid-cols-fill gap-x-3 gap-y-10 justify-items-center py-10">
          {books?.map((book) => (
            <Book
              key={book.id}
              id={book.id}
              image={book.imageUrl}
              fileUrl={book.fileUrl}
              title={book.title}
            />
          ))}
        </div>
      )}
      {books.length != 0 && books.length < count && (
        <div className="flex justify-center py-5">
          <Button onClick={nextPage}>Load more</Button>
        </div>
      )}
    </>
  );
}

export default AllBooks;

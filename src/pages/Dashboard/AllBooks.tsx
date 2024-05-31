import Book from "../../components/Book/Book";
import UploadModal from "../../components/Upload_Modal/UploadModal";
import Button from "../../components/ui/Button";
import { useFetch } from "../../hooks/useFetch";

const PAGE_SIZE = 3;

function AllBooks() {
  const {
    data: allBooks,
    loading,
    nextPage,
    totalLength: count,
  } = useFetch(PAGE_SIZE);

  console.log(allBooks);

  return (
    <>
      <div className="flex justify-between px-5">
        <h2 className="text-4xl font-poetsenOne">All Books</h2>
        <UploadModal />
      </div>
      {loading ? (
        <p className="ps-5 mt-5">Loading...</p>
      ) : allBooks.length === 0 ? (
        <p className="ps-5 mt-5">Sorry you have no book</p>
      ) : (
        <div className="grid grid-cols-fill gap-x-3 gap-y-10 justify-items-center py-10">
          {allBooks?.map((book, index) => (
            <Book
              key={index}
              image={book.imageUrl}
              fileUrl={book.fileUrl}
              title={book.title}
            />
          ))}
        </div>
      )}
      {allBooks.length != 0 && allBooks.length < count && (
        <div className="flex justify-center py-5">
          <Button onClick={nextPage}>Loading more</Button>
        </div>
      )}
    </>
  );
}

export default AllBooks;

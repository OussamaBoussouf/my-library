import { ChangeEvent, useEffect, useState } from "react";
import Book from "../../components/Book/Book";
import UploadModal from "../../components/Upload_Modal/UploadModal";
import Button from "../../components/ui/Button";
import { useFetch } from "../../hooks/useFetch";
import { useDebounce } from "../../hooks/useDebounce";

const PAGE_SIZE = 4;
const categories = ["all", "drama", "non-fiction", "fiction"];

function AllBooks() {
  const [selectedCat, setSelectedCat] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 800);
  const {
    data: allBooks,
    loading,
    nextPage,
    totalLength: count,
    search,
  } = useFetch(PAGE_SIZE, selectedCat);

  const onSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedCat(e.target.value);
  };

  useEffect(() => {
    search(searchTerm);
    console.log("searching...");
  }, [debouncedSearchTerm]);

  return (
    <>
      <div className="flex justify-between mb-4">
        <h2 className="text-4xl font-poetsenOne">All Books</h2>
        <UploadModal />
      </div>
      <div className="flex justify-between">
        <input
          type="search"
          name="search"
          id="search"
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-gray-200 p-1"
        />
        <select
          onChange={onSelect}
          name="categroy"
          id="category"
          className="bg-gray-200 p-1"
        >
          {categories.map((category) => (
            <option key={category} value={category == "all" ? "" : category}>
              {category}
            </option>
          ))}
        </select>
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
          <Button onClick={nextPage}>Load more</Button>
        </div>
      )}
    </>
  );
}

export default AllBooks;

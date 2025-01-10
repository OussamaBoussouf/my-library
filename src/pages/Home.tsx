import SingelBook from "../components/Single-book/SingleBook";
import SearchInput from "../components/ui/SearchInput";
import Skeleton from "../components/ui/Skeleton";
// import { useBook } from "../context/bookContext";
import search from "../assets/search.svg";
import oragneBook from "../assets/orange-book.svg";
import { selectOptions } from "../constants/constant";
import { useLocation } from "react-router-dom";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  getAllBooks,
  getBooksInTrash,
  getFavoriteBooks,
} from "../services/book-api";
import { Select } from "../components/ui/Select";
import { Filter } from "lucide-react";

const title: Record<string, string> = {
  "/dashboard": "All Books",
  "/dashboard/favorite": "Favorite Books",
  "/dashboard/trash": "Trash",
};

function Home() {
  const path = useLocation().pathname;
  const [selectedFilter, setSelectedFilter] = useState("");
  const [searchedValue, setSearchedValue] = useState("");

  let query;

  if (path.endsWith("favorite")) {
    query = useQuery({ queryKey: ["favorite"], queryFn: getFavoriteBooks });
  } else if (path.endsWith("trash")) {
    query = useQuery({ queryKey: ["trash"], queryFn: getBooksInTrash });
  } else {
    query = useQuery({ queryKey: ["all"], queryFn: getAllBooks });
  }

  const { data, isLoading } = query;

  const filteredBooks = useMemo(() => {
    if (selectedFilter === "") return data;
    return data?.filter((book) => book.category === selectedFilter);
  }, [selectedFilter, data]);

  const searchedBooks = useMemo(
    () =>
      filteredBooks?.filter((book) =>
        book.title.includes(searchedValue.toLowerCase())
      ),
    [searchedValue, selectedFilter, data]
  );

  useEffect(() => {
    if (window.scrollY != 0) {
      window.scrollTo(0, 0);
    }
  }, [path]);


  return (
    <div className="text-white sm:ml-[200px] md:ml-[250px] w-[95vw] max-w-[1000px] p-5 min-h-screen">
      
      <SearchInput onChange={(value) => setSearchedValue(value)} />
      
      <div className="flex justify-between items-center my-10">
        <h2 className="text-xl md:text-3xl font-roboto-bold">{title[path]}</h2>
        {/* <Select /> */}
        <Select onChange={(value: string) => setSelectedFilter(value)}>
          <Select.Trigger>
            <Select.Icon>
              <Filter size="20" />
            </Select.Icon>
          </Select.Trigger>
          <Select.SelectGroup>
            {selectOptions.map((option, index) => (
              <Select.SelectItem key={index} value={option} />
            ))}
          </Select.SelectGroup>
        </Select>
      </div>
      {isLoading && <p>Loading...</p>}
      {/* {selectedFilter !== "" && searchedBooks?.length === 0 && (
        <p>Filter is Empty</p>
      )} */}
      {/* {searchedValue !== "" && searchedBooks?.length === 0 && (
        <p>Search is Empty</p>
      )} */}
      {/* If there is no result after searching */}
      {/* {isEmpty && (
        <div className="text-center mt-20 flex flex-col items-center">
          <img className="mb-10 w-52" src={search} alt="search icon" />
          <h2 className="text-2xl font-bold mb-5">No results found</h2>
          <p className="w-60">
            Try adjusting your search to find what you are looking for
          </p>
        </div>
      )} */}
      {/* No book exists in this applied filter */}
      {/* {hasNoBooks && (
        <div className="text-center mt-20 flex flex-col items-center">
          <img className="w-36" src={oragneBook} alt="orange book" />
          <h2 className="text-xl mb-5">There is no book on this section</h2>
        </div>
      )}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-10 gap-x-10">
        {loading && (
          <>
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </>
        )}
        {data.length != 0 &&
          data?.map((book, index) => <SingelBook key={index} book={book} />)}
      </div> */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-10 gap-x-10">
        {searchedBooks &&
          searchedBooks.map((book) => <SingelBook key={book.id} book={book} />)}
      </div>
    </div>
  );
}

export default Home;

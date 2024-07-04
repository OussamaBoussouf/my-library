import SingelBook from "../components/Singel-book/SingelBook";
import SearchInput from "../components/ui/SearchInput";
import Select from "../components/ui/Select";
import Skeleton from "../components/ui/Skeleton";
import { useBook } from "../context/bookContext";
import search from "../assets/search.svg";
import oragneBook from "../assets/orange-book.svg";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const title: Record<string, string> = {
  "/dashboard": "All Books",
  "/dashboard/favorite": "Favorite Books",
  "/dashboard/trash": "Trash",
};

function Home() {
  const { data, loading, isEmpty, hasNoBooks } = useBook();
  const path = useLocation().pathname;

  useEffect(() => {
    if (window.scrollY != 0) {
      window.scrollTo(0, 0);
    }
  }, [path]);

  return (
    <div className="text-white sm:ml-[200px] md:ml-[250px] w-[95vw] max-w-[1000px] p-5 min-h-screen">
      {/* Search bar */}
      <SearchInput />
      {/* Filter bar */}
      <div className="flex justify-between items-center my-10">
        <h2 className="text-xl md:text-3xl font-roboto-bold">{title[path]}</h2>
        <Select />
      </div>
      {isEmpty && (
        <div className="text-center mt-20 flex flex-col items-center">
          <img className="mb-10 w-52" src={search} alt="search icon" />
          <h2 className="text-2xl font-bold mb-5">No results found</h2>
          <p className="w-60">
            Try adjusting your search to find what you are looking for
          </p>
        </div>
      )}
      {hasNoBooks && (
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
      </div>
    </div>
  );
}

export default Home;

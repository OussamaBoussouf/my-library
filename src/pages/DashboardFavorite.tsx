import { useQuery } from "@tanstack/react-query";
import { getFavoriteBooks } from "../services/book-api";
import SingelBook from "../components/Single-book/SingleBook";
import Skeleton from "../components/ui/Skeleton";
import { useMemo } from "react";
import { useOutletContext } from "react-router-dom";
import EmptySearch from "../components/ui/EmptySearch";
import { CircleX, FileText } from "lucide-react";
import EmptySection from "../components/ui/EmptySection";

function DashboardFavorite() {
  const { searchedValue, selectedFilter } = useOutletContext<{
    searchedValue: string;
    selectedFilter: string;
  }>();

  let { data, isLoading } = useQuery({
    queryKey: ["favorite"],
    queryFn: getFavoriteBooks,
  });

  const books = useMemo(
    () =>
      data
        ?.filter((book) => book.category.includes(selectedFilter.toLowerCase()))
        .filter((book) => book.title.includes(searchedValue.toLowerCase())),
    [searchedValue, selectedFilter, data]
  );

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-10 gap-x-10">
        {[...Array(8).keys()].map((i) => (
          <Skeleton key={i} />
        ))}
      </div>
    );
  }

  if (searchedValue !== "" && books?.length == 0) {
    return <EmptySearch />;
  }

  if (selectedFilter !== "" && books?.length === 0) {
    return <EmptySection/>;
  }

  if (books?.length === 0) {
    return (
      <EmptySection/>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-10 gap-x-10">
        {books && books.map((book) => <SingelBook key={book.id} book={book} />)}
      </div>
    </>
  );
}

export default DashboardFavorite;

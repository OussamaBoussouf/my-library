import { useQuery } from "@tanstack/react-query";
import { getAllBooks } from "../services/book-api";
import SingelBook from "../components/Single-book/SingleBook";
import { useOutletContext } from "react-router-dom";
import { useMemo } from "react";

import Skeleton from "../components/ui/Skeleton";
import EmptySearch from "../components/ui/EmptySearch";
import EmptySection from "../components/ui/EmptySection";

function DashboardHome() {
  const { searchedValue, selectedFilter } = useOutletContext<{
    searchedValue: string;
    selectedFilter: string;
  }>();

  let { data, isLoading } = useQuery({
    queryKey: ["all"],
    queryFn: getAllBooks,
  });

  const books = useMemo(
    () =>
      data
        ?.filter((book) => book.category.includes(selectedFilter.toLowerCase()))
        .filter((book) => book.title.includes(searchedValue.toLowerCase())),
    [searchedValue, selectedFilter, data]
  );

  console.log(books);

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-10 gap-x-10">
        {[...Array(8).keys()].map((i) => (
          <Skeleton key={i} />
        ))}
      </div>
    );
  }

  if (searchedValue !== "" && books?.length === 0) {
    return <EmptySearch />;
  }

  if (selectedFilter !== "" && books?.length === 0) {
    return <EmptySection />;
  }

  if (books?.length === 0) {
    return <EmptySection />;
  }

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-10 gap-x-10">
        {books && books.map((book) => <SingelBook key={book.id} book={book} />)}
      </div>
    </>
  );
}

export default DashboardHome;

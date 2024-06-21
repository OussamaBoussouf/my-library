import { ReactNode, createContext, useContext } from "react";
import { useFetch } from "../hooks/useFetch";
import { InfoBook } from "../utils/type";

interface BookContext {
  data: InfoBook[];
  selectCat: (category: string, type: string) => void;
  search: (keyword: string) => void;
  loading: boolean;
  isEmpty: boolean;
  hasNoBooks: boolean;
}

const BookContext = createContext<BookContext | null>(null);

export const useBook = () => {
  const context = useContext(BookContext);

  if (!context) {
    throw new Error("you can't use useBook outside of its context");
  }

  return context;
};

const BookProvider = ({ children }: { children: ReactNode }) => {
  
  const { data, selectCat, search, loading, isEmpty, hasNoBooks } = useFetch();

  const allValue = { data, selectCat, search, loading, isEmpty, hasNoBooks };

  return (
    <BookContext.Provider value={allValue}>{children}</BookContext.Provider>
  );
};

export default BookProvider;

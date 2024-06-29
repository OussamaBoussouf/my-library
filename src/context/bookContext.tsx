import { ReactNode, createContext, useContext } from "react";
import { useFetch } from "../hooks/useFetch";
import { IBookContext} from "../utils/type";


const BookContext = createContext<IBookContext | null>(null);

export const useBook = () => {
  const context = useContext(BookContext);

  if (!context) {
    throw new Error("you can't use useBook outside of its context");
  }

  return context;
};

const BookProvider = ({ children }: { children: ReactNode }) => {
  const {
    data,
    selectCat,
    search,
    moveToTrash,
    addToFavorite,
    removeFromFavorite,
    deleteBook,
    restoreBook,
    loading,
    isEmpty,
    hasNoBooks,
  } = useFetch();

  const allValue = {
    data,
    selectCat,
    search,
    moveToTrash,
    addToFavorite,
    removeFromFavorite,
    deleteBook,
    restoreBook,
    loading,
    isEmpty,
    hasNoBooks,
  };

  return (
    <BookContext.Provider value={allValue}>{children}</BookContext.Provider>
  );
};

export default BookProvider;

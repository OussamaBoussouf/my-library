import { useEffect, useState } from "react";

// retrieve the keyword from input
// delay the new keyword for sometime
// then return the keyword that need to be fetch for

export const useDebounce = (keyword: string, delay: number) => {
  const [term, setTerm] = useState(keyword);
  useEffect(() => {
    const search = setTimeout(() => {
      setTerm(keyword);
    }, delay);

    return () => clearTimeout(search);
  }, [keyword, delay]);

  return term;
};

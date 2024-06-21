import { Search } from "lucide-react";
import { useBook } from "../../context/bookContext";

function SearchInput() {
  const { search} = useBook();

  return (
    <div className="relative">
      <Search className="absolute top-1/2 -translate-y-1/2 left-4" />
      <input
        onChange={(e) => search(e.target.value)}
        type="search"
        placeholder="Type here to search"
        className="bg-[#15171c] w-full p-2 rounded-md pl-12"
      />
    </div>
  );
}

export default SearchInput;

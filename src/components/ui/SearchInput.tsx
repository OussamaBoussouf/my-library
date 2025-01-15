import { Search } from "lucide-react";

function SearchInput({ onChange }: { onChange: (value: string) => void }) {
  return (
    <div className="relative">
      <Search className="absolute top-1/2 -translate-y-1/2 left-4" />
      <input
        onChange={(e) => onChange(e.target.value)}
        type="search"
        placeholder="Type here to search"
        className="bg-[#15171c] w-full p-2 rounded-md pl-12"
      />
    </div>
  );
}

export default SearchInput;

import { useState } from "react";
import SearchInput from "../components/ui/SearchInput";

import { selectOptions } from "../constants/constant";
import { Outlet, useLocation } from "react-router-dom";
import { useDebounce } from "../hooks/useDebounce";
import { Select } from "../components/ui/Select";

const title: Record<string, string> = {
  "/dashboard": "All Books",
  "/dashboard/favorite": "Favorite Books",
  "/dashboard/trash": "Trash",
};

function SearchFilterLayout() {
  const path = useLocation().pathname;
  const [selectedFilter, setSelectedFilter] = useState("");
  const [searchedValue, setSearchedValue] = useState("");

  const { debouncedValue } = useDebounce(searchedValue, 1000);

  return (
    <div className="text-white sm:ml-[200px] md:ml-[250px] w-[95vw] max-w-[1000px] p-5 min-h-screen">
      <SearchInput onChange={(value) => setSearchedValue(value.trim())} />
      <div className="flex justify-between items-center my-10">
        <h2 className="text-xl md:text-3xl font-roboto-bold">{title[path]}</h2>
        {/* <Select /> */}
        <Select onChange={(value: string) => setSelectedFilter(value)}>
          <Select.Trigger placeholder="Filter by" />
          <Select.SelectGroup className="overflow-y-auto max-h-[200px]">
            {selectOptions.map((option, index) => (
              <Select.SelectItem key={index} value={option} />
            ))}
          </Select.SelectGroup>
        </Select>
      </div>
      <Outlet context={{ searchedValue: debouncedValue, selectedFilter }} />
    </div>
  );
}

export default SearchFilterLayout;

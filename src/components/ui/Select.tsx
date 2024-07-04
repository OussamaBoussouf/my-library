import { ListFilter } from "lucide-react";
import { useToggle } from "../../hooks/useToggle";
import { useEffect, useRef, useState } from "react";
import { useClickOutside } from "../../hooks/useClickOutside";
import { useBook } from "../../context/bookContext";
import { useLocation } from "react-router-dom";

const options = [
  "all",
  "fantasy",
  "mystery",
  "romance",
  "adventure",
  "horror",
  "science fiction",
  "historical fiction",
  "humor",
  "biography",
  "coding",
  "other",
];

const Select = () => {
  const { toggle: isOpen, toggleExpand } = useToggle();
  const [selectedCat, setSelectedCat] = useState("");
  const divNode = useRef<HTMLDivElement | null>(null);
  const path = useLocation().pathname;
  const { selectCat } = useBook();
  useClickOutside(divNode, toggleExpand, isOpen);

  const handleSelect = (option: string) => {
    setSelectedCat(option);
    selectCat(option, path.substring(11));
    toggleExpand();
  };


  useEffect(() => {
    if (selectedCat) setSelectedCat("");
  }, [path]);

  return (
    <>
      <div ref={divNode} className="relative">
        <div
          onClick={toggleExpand}
          className="bg-[#15171c] capitalize cursor-pointer px-4 py-2 text-sm rounded-md flex justify-between items-center"
        >
          <ListFilter className="me-2" />
          {selectedCat != "" ? selectedCat : "Apply filter"}
        </div>
        {isOpen && (
          <ul className="max-h-[176px] overflow-auto absolute z-10 top-[120%] right-0 bg-[#15171c] py-2 rounded-md w-[150px]">
            {options.map((option, index) => (
              <li
                key={index}
                onClick={() => handleSelect(option)}
                className="capitalize px-3 py-2 cursor-pointer hover:bg-orange-400 hover:text-black"
              >
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default Select;

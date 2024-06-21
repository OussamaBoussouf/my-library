import { useRef, useState } from "react";
import { useToggle } from "../../hooks/useToggle";
import { useClickOutside } from "../../hooks/useClickOutside";
import { ChevronDown } from "lucide-react";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";
import { IBook } from "../../utils/type";

const options = [
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

const SelectCategory = ({
  register,
  setValue,
}: {
  register: UseFormRegister<IBook>;
  setValue: UseFormSetValue<IBook>;
}) => {
  const { toggle: isOpen, toggleExpand } = useToggle();
  const [selectedCat, setSelectedCat] = useState("");
  const divNode = useRef<HTMLDivElement | null>(null);
  useClickOutside(divNode, toggleExpand, isOpen);

  const handleSelect = (option: string) => {
    setSelectedCat(option);
    setValue("category", option, { shouldValidate: true });
    toggleExpand();
  };

  return (
    <>
      <div ref={divNode} className="relative mt-2">
        <div
          role="select"
          onClick={toggleExpand}
          {...register("category", { required: true })}
          className="bg-[#15171c] text-gray-300 capitalize cursor-pointer px-4 py-2 text-sm rounded-md flex justify-between items-center"
        >
          {selectedCat != "" ? selectedCat : "Select category"}
          <ChevronDown />
        </div>
        {isOpen && (
          <ul className="max-h-[176px] overflow-auto w-[100%] absolute z-10 top-[120%] right-0 bg-[#15171c] py-2 rounded-md">
            {options.map((option, index) => (
              <li
                role="option"
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

export default SelectCategory;

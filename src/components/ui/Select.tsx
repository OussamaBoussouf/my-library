// import { forwardRef } from "react";

import { ListFilter } from "lucide-react";
import { useToggle } from "../../hooks/useToggle";
import { useRef, useState } from "react";
import { useClickOutside } from "../../hooks/useClickOutside";

// type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;

// const Select = forwardRef<HTMLSelectElement, SelectProps>(function(props: SelectProps, ref) {
//     return (
//         <select  ref={ref} {...props} className="bg-gray-300 w-full rounded-md placeholder-black py-2 px-4">
//             <option value="" disabled> __Select-Category__</option>
//             <option value="non-fiction">non-fiction</option>
//             <option value="fiction">fiction</option>
//             <option value="drama">drama</option>
//         </select>
//     );
// })

// export default Select;

const Select = ({ options }: { options: string[] }) => {
  const { toggle: isOpen, toggleExpand } = useToggle();
  const [selectedCat, setSelectedCat] = useState("");
  const divNode = useRef<HTMLDivElement | null>(null);

  useClickOutside(divNode, toggleExpand, isOpen);

  const handleSelect = (option: string) => {
    setSelectedCat(option);
    toggleExpand();
  };

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
          <ul className="absolute z-10 top-[120%] right-0 bg-[#15171c] py-2 rounded-md w-[150px]">
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

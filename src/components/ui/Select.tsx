import { ChevronDown } from "lucide-react";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

type SelectContextType = {
  selectedValue: string;
  setSelectedValue: React.Dispatch<React.SetStateAction<string>>;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onChange: (value: string) => void;
};

const SelectContext = createContext<SelectContextType | null>(null);

type SelectProps = {
  children: ReactNode;
  onChange: (value: string) => void;
};

function Select({ onChange, children }: SelectProps) {
  const [selectedValue, setSelectedValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  return (
    <SelectContext.Provider
      value={{ selectedValue, setSelectedValue, isOpen, setIsOpen, onChange }}
    >
      <div className="relative">{children}</div>
    </SelectContext.Provider>
  );
}

const Icon = ({
  children,
  className,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return <div className={className}>{children}</div>;
};

Select.Icon = Icon;

const Trigger = ({
  children,
  placeholder,
  className,
}: {
  children: ReactNode;
  placeholder: string;
  className?: string;
}) => {
  const { selectedValue, isOpen, setIsOpen } = useSelectContext();
  return (
    <button
      onClick={() => setIsOpen(!isOpen)}
      className={`min-w-[200px] bg-light-dark text-white py-2 px-3 rounded-lg flex justify-between items-center gap-2 ${className}`}
    >
      <div className="flex items-center">
        {children} {selectedValue ? selectedValue : placeholder}
      </div>
      <ChevronDown size={20} />
    </button>
  );
};

Select.Trigger = Trigger;



const SelectGroup = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  const { isOpen, setIsOpen } = useSelectContext();

  const ulRef = useRef<HTMLUListElement | null>(null);

  const handleClickOutside = (e: MouseEvent) => {
    if (ulRef.current !== null && !ulRef.current?.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) document.addEventListener("mouseup", handleClickOutside);

    return () => document.removeEventListener("mouseup", handleClickOutside);
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <ul
          ref={ulRef}
          className={`thin-scrollbar absolute z-10 top-[100%] w-full mt-2 bg-light-dark overflow-hidden rounded-lg ${className}`}
        >
          {children}
        </ul>
      )}
    </>
  );
};

Select.SelectGroup = SelectGroup;



const SelectItem = ({
  value,
  className,
}: {
  value: string;
  className?: string;
}) => {
  const { setSelectedValue, setIsOpen, onChange } = useSelectContext();
  return (
    <li role="option">
      <button
        className={`py-1 px-2 hover:bg-orange-500 hover:text-black text-white w-full text-start ${className}`}
        onClick={() => {
          setSelectedValue(value);
          onChange(value);
          setIsOpen(false);
        }}
      >
        {value}
      </button>
    </li>
  );
};

Select.SelectItem = SelectItem;

export { Select, Icon, Trigger, SelectItem, SelectGroup };

const useSelectContext = () => {
  const context = useContext(SelectContext);

  if (!context) {
    throw new Error(
      "the useSelectContext should be used within a Select component"
    );
  }

  return context;
};

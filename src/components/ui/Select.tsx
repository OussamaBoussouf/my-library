import { ChevronDown } from "lucide-react";
import React, {
  createContext,
  forwardRef,
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
  className?: string;
  onChange: (value: string) => void;
};

const SelectRoot = forwardRef<HTMLDivElement, SelectProps>((props) => {
  const { children, onChange, className } = props;

  const [selectedValue, setSelectedValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const divRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (e: MouseEvent) => {
    if (
      divRef.current !== null &&
      !divRef.current?.contains(e.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) document.addEventListener("mouseup", handleClickOutside);

    return () => document.removeEventListener("mouseup", handleClickOutside);
  }, [isOpen]);

  return (
    <SelectContext.Provider
      value={{ selectedValue, setSelectedValue, isOpen, setIsOpen, onChange }}
    >
      <div ref={divRef} role="select" className={`relative ${className ?? ""}`}>
        {children}
      </div>
    </SelectContext.Provider>
  );
});

const Icon = ({
  children,
  className,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return <div className={className}>{children}</div>;
};

const Trigger = ({
  placeholder,
  className,
}: {
  placeholder: string;
  className?: string;
}) => {
  const { selectedValue, isOpen, setIsOpen } = useSelectContext();
  return (
    <button
      type="button"
      onClick={() => setIsOpen(!isOpen)}
      className={`min-w-[200px] bg-light-dark text-white py-2 px-3 rounded-lg flex justify-between items-center gap-2 ${className}`}
    >
      <div className="flex items-center">
        {selectedValue ? selectedValue : placeholder}
      </div>
      <ChevronDown size={20} />
    </button>
  );
};

const SelectGroup = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  const { isOpen } = useSelectContext();

  return (
    <>
      {isOpen && (
        <ul
          className={`thin-scrollbar absolute z-10 top-[100%] w-full mt-2 p-1 bg-light-dark overflow-hidden rounded-lg ${className}`}
        >
          {children}
        </ul>
      )}
    </>
  );
};

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
        type="button"
        className={`py-1 px-2 hover:bg-light-gray rounded-lg text-white w-full text-start ${className}`}
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

export const Select = Object.assign(SelectRoot, {
  Trigger,
  Icon,
  SelectItem,
  SelectGroup,
});

const useSelectContext = () => {
  const context = useContext(SelectContext);

  if (!context) {
    throw new Error(
      "the useSelectContext should be used within a Select component"
    );
  }

  return context;
};

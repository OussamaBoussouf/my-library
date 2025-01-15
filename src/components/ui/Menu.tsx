import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

type MenuContextType = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const MenuContext = createContext<MenuContextType | null>(null);

type MenuProps = {
  children: ReactNode;
  className?: string;
};

export default function Menu({ children, className }: MenuProps) {
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
    <MenuContext.Provider value={{ isOpen, setIsOpen }}>
      <div ref={divRef} className={`relative ${className ?? ""}`}>
        {children}
      </div>
    </MenuContext.Provider>
  );
}

type MenuButtonProps = {
  children: ReactNode;
  className?: string;
};

const MenuButton = ({ children, className }: MenuButtonProps) => {
  const { isOpen, setIsOpen } = useMenuContext();
  return (
    <button
      type="button"
      className={`${className ?? ""}`}
      onClick={() => setIsOpen(!isOpen)}
    >
      {children}
    </button>
  );
};

Menu.MenuButton = MenuButton;

type MenuItemsProps = {
  children: ReactNode;
  className?: string;
};

const MenuItems = ({ children, className }: MenuItemsProps) => {
  const { isOpen } = useMenuContext();
  const ulRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    if (isOpen && ulRef.current) {
      const dropdownRight = ulRef.current.getBoundingClientRect();
      window.innerWidth - dropdownRight.right <= 0
        ? (ulRef.current.style.right = "0")
        : (ulRef.current.style.left = "0");
    }
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <ul
          ref={ulRef}
          className={`bg-light-dark rounded-lg p-2 absolute top-[120%] w-[150px] z-10 ${
            className ?? ""
          }`}
        >
          {children}
        </ul>
      )}
    </>
  );
};

Menu.MenuItems = MenuItems;

type MenuItemProps = {
  children: ReactNode;
  className?: string;
  handleClick: () => void;
};

const MenuItem = ({ children, className, handleClick }: MenuItemProps) => {
  const { setIsOpen } = useMenuContext();
  return (
    <li>
      <button
        type="button"
        onClick={() => {
          handleClick();
          setIsOpen(false);
        }}
        className={`hover:bg-light-gray text-start p-2 rounded-md w-full inline-flex items-center ${
          className ?? ""
        }`}
      >
        {children}
      </button>
    </li>
  );
};

Menu.MenItem = MenuItem;

type Icon = {
  children: ReactNode;
  className?: string;
};

const MenuIcon = ({ children, className }: Icon) => {
  return <div className={`me-2 ${className ?? ""}`}>{children}</div>;
};

Menu.MenuIcon = MenuIcon;

const useMenuContext = () => {
  const context = useContext(MenuContext);

  if (!context) {
    throw new Error(
      "the useMenuContext should be used within a Menu component"
    );
  }

  return context;
};

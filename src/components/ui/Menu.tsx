import {
  ArchiveRestore,
  EllipsisVertical,
  Star,
  StarHalf,
  Trash,
} from "lucide-react";
import { useToggle } from "../../hooks/useToggle";
import { useRef, useState } from "react";
import { useClickOutside } from "../../hooks/useClickOutside";
import { useLocation } from "react-router-dom";
import { InfoBook } from "../../utils/type";
import Dialog from "./Dialog";
import { useBook } from "../../context/bookContext";

const Menu = ({ book }: { book: InfoBook }) => {
  const divNode = useRef<HTMLDivElement | null>(null);
  const { toggle: isOpen, toggleExpand } = useToggle();
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  useClickOutside(divNode, toggleExpand, isOpen);
  const path = useLocation().pathname;

  const { moveToTrash, addToFavorite, removeFromFavorite, restoreBook } =
    useBook();

  return (
    <div ref={divNode} className="absolute top-0 right-0">
      <button
        onClick={toggleExpand}
        type="button"
        className="bg-slate-400 p-1"
      >
        <EllipsisVertical />
      </button>
      {isOpen && (
        <div className="absolute py-3 rounded-md bg-[#26262e] top-[40px] right-0">
          {path == "/dashboard" ? (
            <div className="w-[160px] ">
              <div
                onClick={() => {
                  addToFavorite(book.id).finally(() => toggleExpand());
                }}
                className="flex items-center cursor-pointer gap-2 px-3 py-2 hover:text-black text-white hover:bg-orange-400"
              >
                <Star /> <span>Favorite</span>
              </div>
              <div
                onClick={() => {
                  moveToTrash(book.id).finally(() => toggleExpand());
                }}
                className="flex items-center cursor-pointer gap-2 px-3 py-2 hover:text-black text-white hover:bg-orange-400"
              >
                <Trash /> <span>Move to trash</span>
              </div>
            </div>
          ) : path == "/dashboard/favorite" ? (
            <div
              onClick={() => {
                removeFromFavorite(book.id).finally(() => toggleExpand());
              }}
              className="flex items-center cursor-pointer gap-2 px-3 py-2 hover:text-black text-white hover:bg-orange-400"
            >
              <StarHalf /> <span>Unfavorite</span>
            </div>
          ) : (
            <div className="w-[150px]">
              <div
                onClick={() => {
                  restoreBook(book.id).finally(() => toggleExpand());
                }}
                className="flex items-center cursor-pointer gap-2 px-3 py-2 hover:text-black text-white hover:bg-orange-400"
              >
                <ArchiveRestore /> <span>Restore</span>
              </div>
              <div
                onClick={() => {
                  toggleExpand();
                  setIsDeleteOpen(true);
                }}
                className="flex items-center cursor-pointer gap-2 px-3 py-2 hover:text-black text-white hover:bg-orange-400"
              >
                <Trash /> <span>Delete book</span>
              </div>
            </div>
          )}
        </div>
      )}
      <Dialog
        open={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        document={book}
      />
    </div>
  );
};

export default Menu;

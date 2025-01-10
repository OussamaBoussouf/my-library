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
import Dialog from "./Dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  addToFavorite,
  moveToTrash,
  removeFromFavorite,
  restoreBook,
} from "../../services/book-api";
import toast from "react-hot-toast";
import { DocumentData } from "firebase/firestore";

const Menu = ({ book }: { book: DocumentData }) => {
  const divNode = useRef<HTMLDivElement | null>(null);
  const { toggle: isOpen, toggleExpand } = useToggle();
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  useClickOutside(divNode, toggleExpand, isOpen);
  const path = useLocation().pathname;

  const queryClient = useQueryClient();

  const handleRemoveFromFavorite = useMutation({
    mutationFn: removeFromFavorite,
    onSuccess: () => {
      toast.success("This book has been removed from favorite");
      queryClient.invalidateQueries({ queryKey: ["favorite"] });
    },
    onError: (error) => {
      console.error(error);
      toast.error(error.message);
    },
  });

  const handleMoveToTrash = useMutation({
    mutationFn: moveToTrash,
    onSuccess: () => {
      toast.success("This book has been moved to trash");
      queryClient.invalidateQueries({ queryKey: ["all"] });
    },
    onError: (error) => {
      console.error(error);
      toast.error(error.message);
    },
  });

  const handleFavorite = useMutation({
    mutationFn: addToFavorite,
    onSuccess: () => {
      toast.success("This book has been added to favorite");
    },
    onError: (error) => {
      console.error(error);
      toast.error(error.message);
    },
  });

  const handleRestore = useMutation({
    mutationFn: restoreBook,
    onSuccess: () => {
      toast.success("This book has been restored");
      queryClient.invalidateQueries({ queryKey: ["trash"] });
    },
    onError: (error) => {
      console.error(error);
      toast.error(error.message);
    },
  });

  return (
    <div ref={divNode} className="absolute top-0 right-0">
      <button onClick={toggleExpand} type="button" className="bg-slate-400 p-1">
        <EllipsisVertical />
      </button>
      {isOpen && (
        <div className="absolute py-3 rounded-md bg-[#26262e] top-[40px] right-0">
          {path == "/dashboard" ? (
            <div className="w-[160px] ">
              <button
                onClick={() => {
                  handleFavorite.mutate(book.id);
                }}
                className="flex items-center cursor-pointer gap-2 px-3 py-2 hover:text-black text-white hover:bg-orange-400"
              >
                <Star /> <span>Favorite</span>
              </button>
              <button
                onClick={() => {
                  handleMoveToTrash.mutate(book.id);
                }}
                className="flex items-center cursor-pointer gap-2 px-3 py-2 hover:text-black text-white hover:bg-orange-400"
              >
                <Trash /> <span>Move to trash</span>
              </button>
            </div>
          ) : path == "/dashboard/favorite" ? (
            <div
              onClick={() => {
                handleRemoveFromFavorite.mutate(book.id);
              }}
              className="flex items-center cursor-pointer gap-2 px-3 py-2 hover:text-black text-white hover:bg-orange-400"
            >
              <StarHalf /> <span>Unfavorite</span>
            </div>
          ) : (
            <div className="w-[150px]">
              <div
                onClick={() => {
                  handleRestore.mutate(book.id);
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

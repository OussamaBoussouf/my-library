import { Link, useLocation } from "react-router-dom";
import { imagekitUrl } from "../../utils/imagekitUrl";
import { DocumentData } from "firebase/firestore";
import Menu from "../ui/Menu";
import {
  EllipsisVertical,
  FileX,
  RotateCcw,
  Star,
  StarOff,
  Trash2,
} from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  addToFavorite,
  moveToTrash,
  removeFromFavorite,
  restoreBook,
} from "../../services/book-api";
import toast from "react-hot-toast";
import { createPortal } from "react-dom";
import DeleteDialog from "../ui/DeleteDialog";
import { useState } from "react";


function SingelBook({ book }: { book: DocumentData }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const path = useLocation().pathname;

  const queryClient = useQueryClient();

  const { mutate: handleRemoveFromFavorite } = useMutation({
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

  const { mutate: handleMoveToTrash } = useMutation({
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

  const { mutate: handleFavorite } = useMutation({
    mutationFn: addToFavorite,
    onSuccess: () => {
      toast.success("This book has been added to favorite");
    },
    onError: (error) => {
      console.error(error);
      toast.error(error.message);
    },
  });

  const { mutate: handleRestore } = useMutation({
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
    <>
      <div className="relative">
        <div className="absolute right-0 p-1">
          {path.endsWith("trash") ? (
            <Menu>
              <Menu.MenuButton className="bg-light-dark rounded-full w-10 h-10 flex justify-center items-center">
                <EllipsisVertical />
              </Menu.MenuButton>
              <Menu.MenuItems>
                <Menu.MenItem handleClick={() => handleRestore(book.id)}>
                  <Menu.MenuIcon>
                    <RotateCcw size={18} />
                  </Menu.MenuIcon>
                  Restore
                </Menu.MenItem>
                <Menu.MenItem handleClick={() => setIsDialogOpen(true)}>
                  <Menu.MenuIcon>
                    <FileX size={18} />
                  </Menu.MenuIcon>
                  Remove
                </Menu.MenItem>
              </Menu.MenuItems>
            </Menu>
          ) : path.endsWith("favorite") ? (
            <Menu>
              <Menu.MenuButton className="bg-light-dark rounded-full w-10 h-10 flex justify-center items-center">
                <EllipsisVertical />
              </Menu.MenuButton>
              <Menu.MenuItems>
                <Menu.MenItem
                  handleClick={() => handleRemoveFromFavorite(book.id)}
                >
                  <Menu.MenuIcon>
                    <StarOff size={18} />
                  </Menu.MenuIcon>
                  Unfavorite
                </Menu.MenItem>
              </Menu.MenuItems>
            </Menu>
          ) : (
            <Menu>
              <Menu.MenuButton className="bg-light-dark rounded-full w-10 h-10 flex justify-center items-center">
                <EllipsisVertical />
              </Menu.MenuButton>
              <Menu.MenuItems>
                <Menu.MenItem
                  handleClick={() => handleFavorite(book.id)}
                >
                  <Menu.MenuIcon>
                    <Star size={18} />
                  </Menu.MenuIcon>
                  Favorite
                </Menu.MenItem>
                <Menu.MenItem
                  handleClick={() => handleMoveToTrash(book.id)}
                >
                  <Menu.MenuIcon>
                    <Trash2 size={18} />
                  </Menu.MenuIcon>
                  Delete
                </Menu.MenItem>
              </Menu.MenuItems>
            </Menu>
          )}
        </div>
        <Link to={`${book.fileUrl}`} target="_blank">
          <img
            src={imagekitUrl(book.imageUrl)}
            alt="book cover"
            height={330}
            width={210}
            className="w-full"
          />
        </Link>
      </div>
      {/* DELETE DIALOG */}
      {createPortal(
        <DeleteDialog
          document={book}
          open={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
        />,
        document.getElementById("modal-root") as HTMLElement
      )}
    </>
  );
}

export default SingelBook;

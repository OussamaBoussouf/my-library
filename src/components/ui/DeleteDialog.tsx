import { useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBook } from "../../services/book-api";
import toast from "react-hot-toast";
import { DocumentData } from "firebase/firestore";

function DeleteDialog({
  open,
  onClose,
  document,
}: {
  open: boolean;
  onClose: () => void;
  document: DocumentData;
}) {
  const divNode = useRef<HTMLDivElement>(null);

  const queryClient = useQueryClient();

  const handleClose = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === divNode.current) {
      onClose();
    }
  };

  const handleDelete = useMutation({
    mutationFn: deleteBook,
    onSuccess: () => {
      toast.success("Book has been deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["trash"] });
      onClose();
    },
    onError: () => {
      toast.error("Something went wrong we couldn't delete this book ");
    },
  });

  return (
    <>
      {open ? (
        <div
          ref={divNode}
          onClick={handleClose}
          className="bg-transparent-black text-start fixed z-50 inset-0 grid place-content-center"
        >
          <div
            role="alertdialog"
            aria-haspopup="dialog"
            className="p-5 bg-white rounded-lg mx-3 max-w-[550px]"
          >
            <h2 className="text-lg font-bold mb-5 text-black">
              Are you absolutely sure?
            </h2>
            <p className="mb-5 text-black">
              This action cannot be undone. This will permanently delete this
              book and remove it entirely.
            </p>
            <div className="flex justify-end">
              <button
                type="button"
                className="text-black py-2 px-5 border-[2px] rounded-md hover:bg-slate-200"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                disabled={handleDelete.isPending}
                onClick={() => {
                  handleDelete.mutate(document);
                }}
                type="button"
                className="ms-5 bg-red-500 rounded-md py-2 px-5 text-white hover:opacity-80"
              >
                {handleDelete.isPending ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default DeleteDialog;

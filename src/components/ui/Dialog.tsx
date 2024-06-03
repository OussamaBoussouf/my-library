import { deleteDoc, doc } from "firebase/firestore";
import { useRef } from "react";
import { auth, db, storage } from "../../firestore";
import toast from "react-hot-toast";
import { InfoBook } from "../../utils/type";
import { ref, deleteObject } from "firebase/storage";

function Dialog({
  open,
  onClose,
  document,
}: {
  open: boolean;
  onClose: () => void;
  document: InfoBook;
}) {
  const divNode = useRef<HTMLDivElement>(null);

  const handleClose = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === divNode.current) {
      onClose();
    }
  };

  const handleDelete = async () => {
    //REMOVE FROM ALL BOOKS
    try {
      const imageRef = ref(storage, "images/" + document.imageRef);
      const fileRef = ref(storage, "files/" + document.fileRef);
      await deleteObject(imageRef);
      await deleteObject(fileRef);
      await deleteDoc(
        doc(db, `users/${auth.currentUser?.uid}/trash`, document.id)
      );
      toast.success("This book has been deleted successfully");
      onClose();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {open ? (
        <div
          ref={divNode}
          onClick={handleClose}
          className="bg-transparent-black text-start fixed z-20 inset-0 grid place-content-center"
        >
          <div
            role="alertdialog"
            aria-haspopup="dialog"
            className="p-5 bg-white rounded-lg mx-3 max-w-[550px]"
          >
            <h2 className="text-lg font-bold mb-5">Are you absolutely sure?</h2>
            <p className="mb-5">
              This action cannot be undone. This will permanently delete this
              book and remove it entirely.
            </p>
            <div className="flex justify-end">
              <button
                type="button"
                className="py-2 px-5 border-[2px] rounded-md hover:bg-slate-200"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete()}
                type="button"
                className="ms-5 bg-red-500 rounded-md py-2 px-5 text-white hover:opacity-80"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default Dialog;

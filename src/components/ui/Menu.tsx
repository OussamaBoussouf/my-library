import { EllipsisVertical, Star, StarHalf, Trash, ArchiveRestore } from "lucide-react";
import { useClickOutside } from "../../hooks/useClickOutside";
import { memo, useRef } from "react";
import { useToggle } from "../../hooks/useToggle";
import { deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firestore";

import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

function Menu({ documentId }: { documentId: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const id = useParams().id as string;
  const { toggle, toggleExpand } = useToggle();

  useClickOutside(ref, toggleExpand, toggle);

  // ADD A BOOK TO THE FAVORITE LIST
  const addToFavorite = async (docId: string) => {
    try {
      const docRef = doc(db, `users/${auth.currentUser?.uid}/books`, docId);
      const data = await getDoc(docRef);
      await setDoc(
        doc(db, `users/${auth.currentUser?.uid}/favorites`, docId),
        data.data()
      );
      toast.success("This book has been added to your favorite list");
      toggleExpand();
    } catch (err) {
      console.log(err);
      toggleExpand();
    }
  };

  const removeFromFavorite = async(docId:string) => {
    try{
      await deleteDoc(doc(db, `users/${auth.currentUser?.uid}/favorites`, docId));
      toast.success("This book has been deleted");
      toggleExpand();
    }catch(err){
      console.log(err);
    }
    console.log(docId)
  }

  const moveToTrash = async(docId: string) => {
    try{
      //ADD TO TRASH
      const docRef = doc(db, `users/${auth.currentUser?.uid}/books`, docId);
      const data = await getDoc(docRef);
      await setDoc(
        doc(db, `users/${auth.currentUser?.uid}/trash`, docId),
        data.data()
      );
      //REMOVE FROM ALL BOOKS
      await deleteDoc(doc(db, `users/${auth.currentUser?.uid}/books`, docId));
      //REMOVE FROM FAVORITES IF IT EXIST
      const docRefinFav = doc(db, `users/${auth.currentUser?.uid}/favorites`, docId);
      const docSnap = await getDoc(docRefinFav);
      if(docSnap.exists()){
        await deleteDoc(doc(db, `users/${auth.currentUser?.uid}/favorites`, docId));
        console.log("yes it exists");
      }
      toast.success("This book has been moved to trash");
      toggleExpand();
    } catch(err){
      console.log(err);
    }
  }

  const restore = async(docId: string) => {
    try{
      const docRef = doc(db, `users/${auth.currentUser?.uid}/trash`, docId);
      const data = await getDoc(docRef);
      await setDoc(
        doc(db, `users/${auth.currentUser?.uid}/books`, docId),
        data.data()
      );
       //REMOVE FROM TRASH
       await deleteDoc(doc(db, `users/${auth.currentUser?.uid}/trash`, docId));
       toast.success("This book has been restored");
       toggleExpand();
    } catch(err){
      console.log(err);
    }
  }

  return (
    <>
      <div ref={ref} className="absolute top-2 right-1">
        <button
          onClick={toggleExpand}
          type="button"
          className="rounded-md hover:bg-slate-100"
        >
          <EllipsisVertical />
        </button>
        {id === "all-books" ? (
          <>
            {toggle ? (
              <ul className="p-2 bg-white shadow-xl rounded-lg w-[160px] absolute top-[100%] right-0">
                <li
                  onClick={() => addToFavorite(documentId)}
                  className="flex gap-2 mb-5 hover:bg-slate-100 p-1 rounded-md cursor-pointer"
                >
                  <Star /> Favorite
                </li>
                <li onClick={() => moveToTrash(documentId)}
                 className="flex gap-2 text-red-500 hover:bg-slate-100 p-1 rounded-md cursor-pointer">
                  <Trash /> Move to trash
                </li>
              </ul>
            ) : null}
          </>
        ) : id === "favorite-books" ? (
          <>
            {toggle ? (
              <ul className="p-2 bg-white shadow-xl rounded-lg w-[150px] absolute top-[100%] right-0">
                <li
                  onClick={() => removeFromFavorite(documentId)}
                  className="flex hover:bg-slate-100 p-1 rounded-md cursor-pointer"
                >
                  <StarHalf /> Unfavorite
                </li>
              </ul>
            ) : null}
          </>
        ) : (
          <>
            {toggle ? (
              <ul className="p-2 bg-white shadow-xl rounded-lg w-[150px] absolute top-[100%] right-0">
                <li
                  onClick={() => restore(documentId)}
                  className="flex gap-2 mb-5 hover:bg-slate-100 p-1 rounded-md cursor-pointer"
                >
                  <ArchiveRestore color="green" /> Restore
                </li>
                <li className="flex gap-2 text-red-500 hover:bg-slate-100 p-1 rounded-md cursor-pointer">
                  <Trash /> Delete
                </li>
              </ul>
            ) : null}
          </>
        )}
      </div>
    </>
  );
}

export default memo(Menu);

// import {
//   EllipsisVertical,
//   Star,
//   StarHalf,
//   Trash,
//   ArchiveRestore,
// } from "lucide-react";
// import { useClickOutside } from "../../hooks/useClickOutside";
// import { memo, useRef, useState } from "react";
// import { useToggle } from "../../hooks/useToggle";
// import { deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
// import { auth, db } from "../../firestore";

// import toast from "react-hot-toast";
// import { useParams } from "react-router-dom";
// import Dialog from "./Dialog";
// import { InfoBook } from "../../utils/type";

// function Menu({ document }: { document: InfoBook }) {
//   const ref = useRef<HTMLDivElement>(null);
//   const id = useParams().id as string;
//   const { toggle, toggleExpand } = useToggle();
//   const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
//   useClickOutside(ref, toggleExpand, toggle);

//   // ADD A BOOK TO THE FAVORITE LIST
//   const addToFavorite = async (docId: string) => {
//     try {
//       const docRef = doc(db, `users/${auth.currentUser?.uid}/books`, docId);
//       const data = await getDoc(docRef);
//       await setDoc(
//         doc(db, `users/${auth.currentUser?.uid}/favorites`, docId),
//         data.data()
//       );
//       toast.success("This book has been added to your favorite list");
//       toggleExpand();
//     } catch (err) {
//       console.log(err);
//       toggleExpand();
//     }
//   };

//   const removeFromFavorite = async (docId: string) => {
//     try {
//       await deleteDoc(
//         doc(db, `users/${auth.currentUser?.uid}/favorites`, docId)
//       );
//       toast.success("This book has been deleted");
//       toggleExpand();
//     } catch (err) {
//       console.log(err);
//     }
//     console.log(docId);
//   };

//   const moveToTrash = async (docId: string) => {
//     try {
//       //ADD TO TRASH
//       const docRef = doc(db, `users/${auth.currentUser?.uid}/books`, docId);
//       const data = await getDoc(docRef);
//       await setDoc(
//         doc(db, `users/${auth.currentUser?.uid}/trash`, docId),
//         data.data()
//       );
//       //REMOVE FROM ALL BOOKS
//       await deleteDoc(doc(db, `users/${auth.currentUser?.uid}/books`, docId));
//       //REMOVE FROM FAVORITES IF IT EXIST
//       const docRefinFav = doc(
//         db,
//         `users/${auth.currentUser?.uid}/favorites`,
//         docId
//       );
//       const docSnap = await getDoc(docRefinFav);
//       if (docSnap.exists()) {
//         await deleteDoc(
//           doc(db, `users/${auth.currentUser?.uid}/favorites`, docId)
//         );
//         console.log("yes it exists");
//       }
//       toast.success("This book has been moved to trash");
//       toggleExpand();
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const restore = async (docId: string) => {
//     try {
//       const docRef = doc(db, `users/${auth.currentUser?.uid}/trash`, docId);
//       const data = await getDoc(docRef);
//       await setDoc(
//         doc(db, `users/${auth.currentUser?.uid}/books`, docId),
//         data.data()
//       );
//       //REMOVE FROM TRASH
//       await deleteDoc(doc(db, `users/${auth.currentUser?.uid}/trash`, docId));
//       toast.success("This book has been restored");
//       toggleExpand();
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <>
//       <div ref={ref} className="absolute top-2 right-1">
//         <button
//           onClick={toggleExpand}
//           type="button"
//           className="rounded-md hover:bg-slate-100"
//         >
//           <EllipsisVertical />
//         </button>
//         {id === "all-books" ? (
//           <>
//             {toggle ? (
//               <ul className="p-2 bg-white shadow-xl rounded-lg w-[160px] absolute top-[100%] right-0">
//                 <li
//                   onClick={() => addToFavorite(document.id)}
//                   className="flex gap-2 mb-5 hover:bg-slate-100 p-1 rounded-md cursor-pointer"
//                 >
//                   <Star /> Favorite
//                 </li>
//                 <li
//                   onClick={() => moveToTrash(document.id)}
//                   className="flex gap-2 text-red-500 hover:bg-slate-100 p-1 rounded-md cursor-pointer"
//                 >
//                   <Trash /> Move to trash
//                 </li>
//               </ul>
//             ) : null}
//           </>
//         ) : id === "favorite-books" ? (
//           <>
//             {toggle ? (
//               <ul className="p-2 bg-white shadow-xl rounded-lg w-[150px] absolute top-[100%] right-0">
//                 <li
//                   onClick={() => removeFromFavorite(document.id)}
//                   className="flex hover:bg-slate-100 p-1 rounded-md cursor-pointer"
//                 >
//                   <StarHalf /> Unfavorite
//                 </li>
//               </ul>
//             ) : null}
//           </>
//         ) : (
//           <>
//             {toggle ? (
//               <ul className="p-2 bg-white shadow-xl rounded-lg w-[150px] absolute top-[100%] right-0">
//                 <li
//                   onClick={() => restore(document.id)}
//                   className="flex gap-2 mb-5 hover:bg-slate-100 p-1 rounded-md cursor-pointer"
//                 >
//                   <ArchiveRestore color="green" /> Restore
//                 </li>
//                 <li
//                   onClick={() => {
//                     toggleExpand();
//                     setDeleteDialogOpen(true);
//                   }}
//                   className="flex gap-2 text-red-500 hover:bg-slate-100 p-1 rounded-md cursor-pointer"
//                 >
//                   <Trash /> Delete
//                 </li>
//               </ul>
//             ) : null}
//           </>
//         )}
//         <Dialog
//           document={document}
//           open={deleteDialogOpen}
//           onClose={() => {
//             setDeleteDialogOpen(false);
//           }}
//         />
//       </div>
//     </>
//   );
// }

// export default memo(Menu);
import { EllipsisVertical } from "lucide-react";
import { useToggle } from "../../hooks/useToggle";
import { useRef } from "react";
import { useClickOutside } from "../../hooks/useClickOutside";

const Menu = ({ children }: { children: React.ReactNode }) => {
  
  const divNode = useRef<HTMLDivElement | null>(null);
  const { toggle: isOpen, toggleExpand } = useToggle();
  useClickOutside(divNode, toggleExpand, isOpen);

  return (
    <div ref={divNode} className="bg-orange-300">
      <button
        onClick={toggleExpand}
        type="button"
        className="absolute top-0 right-0 bg-slate-400 p-1"
      >
        <EllipsisVertical />
      </button>
      {isOpen && (
        <div className="absolute py-3 rounded-md bg-[#26262e] top-[40px] right-0 w-fit">
          {children}
        </div>
      )}
    </div>
  );
};

const MenuItem = ({
  children,
  icon,
}: {
  children: string;
  icon: JSX.Element;
}) => {
  return (
    <div className="flex items-center cursor-pointer gap-2 px-3 py-2 hover:text-black text-white hover:bg-orange-400">
      {icon} <span>{children}</span>
    </div>
  );
};

Menu.Item = MenuItem;

export default Menu;

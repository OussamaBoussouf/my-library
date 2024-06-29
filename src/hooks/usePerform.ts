// import { doc, getDoc, updateDoc } from "firebase/firestore";
// import { db } from "../firestore";
// import toast from "react-hot-toast";
// import { InfoBook } from "../utils/type";


// export const usePreform = () => {
//   const user = JSON.parse(localStorage.getItem("user") as string);
  
//   const moveToTrash = async (docId: string) => {
//     try {
//       const docRef = doc(db, `users/${user?.uid}/books`, docId);
//       await updateDoc(docRef, { trash: true, favorite: false });
//       toast.success("This book has been moved to trash");
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const addToFavorite = async (docId: string) => {
//     try {
//       const docRef = doc(db, `users/${user?.uid}/books`, docId);
//       const book = await getDoc(docRef);
//       const bookInfo = book.data() as InfoBook;
//       if (bookInfo.favorite) {
//         toast.error("This book is already in your favorite");
//       } else {
//         await updateDoc(docRef, { favorite: true });
//         toast.success("This book has been added to favorite");
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const removeFromFavorite = async (docId: string) => {
//     try {
//       const docRef = doc(db, `users/${user?.uid}/books`, docId);
//       await updateDoc(docRef, { favorite: false });
//       toast.success("This book has been removed from favorite");
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const restoreBook = async (docId: string) => {
//     try {
//       const docRef = doc(db, `users/${user?.uid}/books`, docId);
//       await updateDoc(docRef, { trash: false });
//       toast.success("This book has been restored");
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const allFunction = {
//     moveToTrash,
//     addToFavorite,
//     removeFromFavorite,
//     restoreBook,
//   };

//   return allFunction;
// };

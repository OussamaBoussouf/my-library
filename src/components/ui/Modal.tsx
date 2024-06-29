// import { X } from "lucide-react";
// import React, { useRef } from "react";

// type ModalProps = {
//   onClose: () => void;
//   open: boolean;
//   modalTitle: string;
//   children: React.ReactNode;
// };

// function Modal({ onClose, open, modalTitle, children }: ModalProps) {
//   const ref = useRef<HTMLDivElement>(null);

//   const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
//     if (e.target === ref.current) {
//       onClose();
//     }
//   };

//   return (
//     <>
//       {open ? (
//         <div
//           ref={ref}
//           className="bg-transparent-black fixed z-10 inset-0 grid place-content-center "
//           onClick={handleClick}
//         >
//           <div className="bg-white rounded-lg w-[80vw] max-w-[500px] p-3">
//             <button onClick={onClose} className="float-end" type="button">
//               <X />
//             </button>
//             <h2 className="text-3xl font-poetsenOne text-center pb-2">
//               {modalTitle}
//             </h2>
//             <hr />
//             {children}
//           </div>
//         </div>
//       ) : null}
//     </>
//   );
// }

// export default Modal;

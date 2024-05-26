import { CirclePlus } from "lucide-react";
import Button from "../../components/ui/Button";
//IMAGE
import bookOne from "../../assets/img/book-1.jpg";
import bookTwo from "../../assets/img/book-2.webp";
import bookThree from "../../assets/img/book-3.jpg";
import { useState } from "react";
import Book from "../../components/Book/Book";
import UploadModal from "../../components/Upload_Modal/UploadModal";

function AllBooks() {

  return (
    <>
      <div className="flex justify-between px-5">
        <h2 className="text-4xl font-poetsenOne">All Books</h2>
        <UploadModal />
      </div>
      <div className="grid grid-cols-fit gap-x-3 gap-y-10 justify-items-center py-10">
        <Book image={bookOne} />
        <Book image={bookTwo} />
        <Book image={bookThree} />
        <Book image={bookOne} />
        <Book image={bookTwo} />
        <Book image={bookThree} />
        <Book image={bookOne} />
        <Book image={bookTwo} />
      </div>
    </>
  );
}

export default AllBooks;

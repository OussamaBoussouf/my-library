import { CirclePlus } from "lucide-react";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
//IMAGE
import bookOne from "../../assets/img/book-1.jpg";
import bookTwo from "../../assets/img/book-2.webp";
import bookThree from "../../assets/img/book-3.jpg";
import Modal from "../../components/ui/Modal";
import { useState } from "react";
import Book from "../../components/Book/Book";
import Select from "../../components/ui/Select";

function AllBooks() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="flex justify-between px-5">
        <h2 className="text-4xl font-poetsenOne">All Books</h2>
        <Button onClick={() => setIsModalOpen(true)} className="flex gap-2">
          <CirclePlus /> Upload a book
        </Button>
        <Modal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          modalTitle="Upload New Book"
        >
          <div className="w-full">
            <label htmlFor="image" className="text-start">
              Book cover :
            </label>
            <Input accept="image/*" type="file" id="image" />
          </div>
          <div className="w-full">
            <label htmlFor="title" className="text-start">
              Book Title :
            </label>
            <Input type="text" id="title" />
          </div>
          <div className="w-full">
            <label htmlFor="pdf-file" className="text-start">
              Pdf file :
            </label>
            <Input accept="application/pdf" type="file" id="pdf-file" />
          </div>
          <div className="w-full">
            <label htmlFor="category" className="text-start">
              Select category :
            </label> <br />
            <Select id="category"/>
          </div>
          <Button>Upload Book</Button>
        </Modal>
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

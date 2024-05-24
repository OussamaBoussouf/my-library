import Modal from "../ui/Modal";
import Input from "../ui/Input";
import Select from "../ui/Select";
import Button from "../ui/Button";
import { CirclePlus } from "lucide-react";
import { useToggle } from "../../hooks/useToggle";

function UploadModal() {
  const { toggle: isOpen, toggleExpand } = useToggle();
  return (
    <>
      <Button className="flex gap-2" onClick={toggleExpand}>
        <CirclePlus /> Upload a book
      </Button>
      <Modal open={isOpen} onClose={toggleExpand} modalTitle="Upload New Book">
        <div className="my-5 text-start mx-auto max-w-[350px] flex flex-col gap-5 ">
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
            </label>{" "}
            <br />
            <Select id="category" />
          </div>
          <Button>Upload Book</Button>
        </div>
      </Modal>
    </>
  );
}

export default UploadModal;

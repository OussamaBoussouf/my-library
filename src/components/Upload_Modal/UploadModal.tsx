import Modal from "../ui/Modal";
import Input from "../ui/Input";
import Select from "../ui/Select";
import Button from "../ui/Button";
import { CirclePlus } from "lucide-react";
import { useToggle } from "../../hooks/useToggle";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { uploadBookSchema } from "../../utils/schemaValidator";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { auth, db, storage } from "../../firestore";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { generateString } from "../../utils/randomString";
import { useState } from "react";

//INTERFACE
interface IBook {
  id: string;
  image: FileList;
  title: string;
  pdf: FileList;
  category: string;
}

function UploadModal() {
  const { toggle: isOpen, toggleExpand } = useToggle();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IBook>({ resolver: zodResolver(uploadBookSchema) });

  const onSubmit: SubmitHandler<IBook> = async (data: IBook) => {
    setLoading(true);
    try {
      const imageName = generateString(5);
      const fileName = generateString(5);
      const imageUrl = await uploadFile(data.image[0], "images/" + imageName);
      const pdfUrl = await uploadFile(data.pdf[0], "files/" + fileName);
      createRecord(data.category, data.title, imageUrl, pdfUrl);
      setLoading(false);
      reset();
      toggleExpand();
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const uploadFile = async (file: File, path: string) => {
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, file);
    return getDownloadURL(storageRef);
  };

  const createRecord = (
    category: string,
    title: string,
    imageUrl: string,
    pdfUrl: string
  ) => {
    const id = generateString(10);
    const bookRef = doc(db, "users", `${auth.currentUser?.uid}`);
    updateDoc(bookRef, {
      books: arrayUnion({
        cateogry: category,
        title: title,
        image: imageUrl,
        pdf: pdfUrl,
        id: id,
      }),
    });
  };

  return (
    <>
      <Button className="flex gap-2" onClick={toggleExpand}>
        <CirclePlus /> Upload a book
      </Button>
      <Modal
        open={isOpen}
        onClose={() => {
          toggleExpand();
          reset();
        }}
        modalTitle="Upload New Book"
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="my-5 text-start mx-auto max-w-[350px] flex flex-col gap-5 "
        >
          <div className="w-full">
            <label htmlFor="image" className="text-start">
              Book cover :
            </label>
            <Input
              {...register("image", { required: true })}
              accept="image/*"
              type="file"
              onChange={(e) => console.log(typeof e.target.value)}
            />
            <span className="text-red-500">{errors.image?.message}</span>
          </div>
          <div className="w-full">
            <label htmlFor="title" className="text-start">
              Book Title :
            </label>
            <Input {...register("title", { required: true })} type="text" />
            <span className="text-red-500">{errors.title?.message}</span>
          </div>
          <div className="w-full">
            <label htmlFor="pdf" className="text-start">
              Pdf file :
            </label>
            <Input
              accept="application/pdf"
              {...register("pdf", { required: true })}
              type="file"
            />
            <span className="text-red-500">{errors.pdf?.message}</span>
          </div>
          <div className="w-full">
            <label htmlFor="category" className="text-start">
              Select category :
            </label>
            <br />
            <Select
              {...register("category", { required: true })}
              id="category"
            />
            <span className="text-red-500">{errors.category?.message}</span>
          </div>
          <Button type="submit" loading={loading}>
            Upload New Book
          </Button>
        </form>
      </Modal>
    </>
  );
}

export default UploadModal;

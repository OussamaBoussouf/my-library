import Modal from "../ui/Modal";
import Input from "../ui/Input";
import Select from "../ui/Select";
import Button from "../ui/Button";
import { CirclePlus } from "lucide-react";
import { useToggle } from "../../hooks/useToggle";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { uploadBookSchema } from "../../utils/schemaValidator";
import { useUpload } from "../../hooks/useUpload";
import toast from "react-hot-toast";
//Interface
import { IBook } from "../../utils/type";


function UploadModal() {
  const { toggle: isOpen, toggleExpand } = useToggle();
  const { loading, upload } = useUpload();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IBook>({ resolver: zodResolver(uploadBookSchema) });

  const onSubmit: SubmitHandler<IBook> = async (data: IBook) => {
    upload(data).then(() => {
      reset();
      toggleExpand();
      toast.success("Your book has been download");
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

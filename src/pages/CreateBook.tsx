import { Controller, SubmitHandler, useForm } from "react-hook-form";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { IBook } from "../utils/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { uploadBookSchema } from "../utils/schemaValidator";
import { Select } from "../components/ui/Select";
import { selectOptions } from "../constants/constant";
import { uploadBook } from "../services/book-api";
import toast from "react-hot-toast";
import { useState } from "react";

function CreateBook() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<IBook>({ resolver: zodResolver(uploadBookSchema) });

  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<IBook> = async (data: IBook) => {
    setLoading(true);
    try {
      await uploadBook(data);
      toast.success("The book has been downloaded successfully");
      reset();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong we could not upload this book");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-white sm:ml-[200px] md:ml-[250px] w-[95vw] max-w-[1000px] p-5 min-h-screen">
      <h2 className="text-2xl font-bold mb-5">Create a Book</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-10">
          <label htmlFor="title">Book title</label>
          <Input
            label="Enter book title"
            {...register("title", { required: true })}
            placeholder="Your book title"
          />
          <span className="text-red-500">{errors.title?.message}</span>
        </div>
        <div className="mb-10">
          <label htmlFor="category">Category</label>
          <Controller
            control={control}
            name="category"
            render={({ field }) => (
              <Select
                {...field}
                onChange={(value) => field.onChange(value)}
                className="mt-2"
              >
                <Select.Trigger
                  className="w-full"
                  placeholder="Select category"
                />
                <Select.SelectGroup className="overflow-y-auto max-h-[200px]">
                  {selectOptions.map((option, index) => (
                    <Select.SelectItem key={index} value={option} />
                  ))}
                </Select.SelectGroup>
              </Select>
            )}
          />

          <span className="text-red-500">{errors.category?.message}</span>
        </div>
        <div className="mb-10">
          <label htmlFor="image" className="text-start">
            Book cover
          </label>
          <Input
            label="Upload book cover"
            {...register("image", { required: true })}
            accept="image/*"
            type="file"
          />
          <span className="text-red-500">{errors.image?.message}</span>
        </div>
        <div className="mb-10">
          <label htmlFor="pdf" className="text-start">
            Book file
          </label>
          <Input
            label="Upload pdf file"
            {...register("pdf", { required: true })}
            id="pdf"
            accept="application/pdf"
            type="file"
          />
          <span className="text-red-500">{errors.pdf?.message}</span>
        </div>
        <Button
          loading={loading}
          className="text-lg"
          type="submit"
          variant="primary"
        >
          SUBMIT
        </Button>
      </form>
    </div>
  );
}

export default CreateBook;

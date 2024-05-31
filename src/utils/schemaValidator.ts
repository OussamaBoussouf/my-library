import { z } from "zod";

export const signUpSchema = z.object({
  name: z.string().min(2, { message: "Must be more then 2 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

export const logInSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

export const uploadBookSchema = z.object({
  image: z
    .any()
    .refine((file) => file instanceof FileList && file.length > 0, {
      message: "No file is selected",
    })
    .refine(
      (file) => file[0] instanceof File && file[0].type.startsWith("image/"),
      {
        message: "This field accept only images",
      }
    ),
  title: z.string().min(3, { message: "Title should be at least 3 character" }),
  pdf: z
    .any()
    .refine((file) => file instanceof FileList && file.length > 0, {
      message: "No file is selected",
    })
    .refine(
      (file) =>
        file[0] instanceof File && file[0].type.startsWith("application/pdf"),
      {
        message: "This field accept only pdf",
      }
    ),
  category: z.string().min(1, { message: "Please select a category" }),
});

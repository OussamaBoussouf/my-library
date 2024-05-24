import React from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../utils/cn";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
  loading?: boolean;
};

const buttonVariants = cva(
  "py-2 font-roboto-bold px-4 rounded-md text-white flex items-center justify-center gap-2",
  {
    variants: {
      variant: {
        primary: "bg-indigo-500 text-white disabled:opacity-45",
        secondary: "text-black hover:text-indigo-500",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
);

function Button({ variant, className, loading, ...props }: ButtonProps) {
  return (
    <button disabled={loading} {...props} className={cn(buttonVariants({ variant }), className)}>
      {loading && (
        <div className="h-7 w-7 border-[5px] border-r-blue-600 animate-spin  rounded-full "></div>
      )}
      {props.children}
    </button>
  );
}

export default Button;

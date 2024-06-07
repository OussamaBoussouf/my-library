import React from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../utils/cn";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
  loading?: boolean;
};

const buttonVariants = cva(
  "text-white flex items-center justify-center gap-2",
  {
    variants: {
      variant: {
        primary:
          "hover:opacity-90 bg-orange-500 w-full py-3 text-sm rounded-md disabled:opacity-45",
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
    <button
      disabled={loading}
      {...props}
      className={cn(buttonVariants({ variant }), className)}
    >
      {loading && (
        <div className="h-5 w-5 border-[5px] border-r-gray-400 animate-spin  rounded-full "></div>
      )}
      {props.children}
    </button>
  );
}

export default Button;

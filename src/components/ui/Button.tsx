import React from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../utils/cn";

type ButtonProps = React.HTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
};

const buttonVariants = cva("py-2 font-roboto-bold px-4 rounded-md text-white", {
  variants: {
    variant: {
      primary: "bg-indigo-500 text-white hover:opacity-80",
      secondary: "text-black hover:text-indigo-500",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

function Button({ variant, className, ...props }: ButtonProps) {
  return (
    <button {...props} className={cn(buttonVariants({ variant }), className)}>
      {props.children}
    </button>
  );
}

export default Button;

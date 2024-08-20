import React, { Ref, forwardRef } from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>(function (
  { type, label, ...props },
  ref
) {
  return (
    <>
      <input
      aria-label={label}
        type={type}
        {...props}
        ref={ref as Ref<HTMLInputElement>}
        className="w-full mt-2 bg-[#222429] rounded-md py-2 px-3"
      />
    </>
  );
});

export default Input;

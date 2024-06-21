import React, { Ref, forwardRef } from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>(function (
  { type, placeholder, ...props },
  ref
) {
  return (
    <>
      <input
        type={type}
        {...props}
        placeholder={placeholder}
        ref={ref as Ref<HTMLInputElement>}
        className="w-full mt-2 bg-[#222429] rounded-md py-2 px-3"
      />
    </>
  );
});

export default Input;

import React, { Ref, forwardRef } from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>(function (
  { type, placeholder, ...props },
  ref
) {
  return (
    // <input
    //   type={type}
    //   {...props}
    //   ref={ref as Ref<HTMLInputElement>}
    //   className="bg-gray-300 w-full rounded-md placeholder-black py-2 px-4"
    //   placeholder={placeholder}
    // />
    <>
      <input
        type={type}
        {...props}
        ref={ref as Ref<HTMLInputElement>}
        className="w-full mt-2 bg-[#222429] rounded-md py-2 px-3"
      />
    </>
  );
});

export default Input;

import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

function Input({type , placeholder, ...props}: InputProps) {
  return (
    <input
      type={type}
      {...props}
      className="bg-gray-300 w-full rounded-md placeholder-black py-2 px-4"
      placeholder={placeholder}
    />
  );
}

export default Input;

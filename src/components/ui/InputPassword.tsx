import { Eye, EyeOff } from "lucide-react";
import React, { useRef, useState } from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

function InputPassword({ placeholder, ...props }: InputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleChange = () => {
    if (inputRef.current) {
      if (inputRef.current?.type === "password") {
        inputRef.current.type = "text";
        setIsPasswordVisible(true);
      } else {
        inputRef.current.type = "password";
        setIsPasswordVisible(false);
      }
    }
  };

  return (
    <div className="relative w-full">
      <input
        ref={inputRef}
        type="password"
        {...props}
        className="bg-gray-300 w-full rounded-md placeholder-black py-2 px-4"
        placeholder={placeholder}
      />
      <button type="button" onClick={handleChange}>
        {isPasswordVisible ? (
          <Eye
            size={20}
            color="gray"
            className="absolute right-2 top-1/2 -translate-y-[50%]"
          />
        ) : (
          <EyeOff
            size={20}
            color="gray"
            className="absolute right-2 top-1/2 -translate-y-[50%]"
          />
        )}
      </button>
    </div>
  );
}

export default InputPassword;

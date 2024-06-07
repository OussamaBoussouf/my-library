import { Eye, EyeOff } from "lucide-react";
import React, { forwardRef, useRef, useState } from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const InputPassword = forwardRef<HTMLInputElement, InputProps>(function (
  {...props },
  ref
) {
  const inputRef = useRef<HTMLInputElement | null>(null);

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
        ref={(node) => {
          inputRef.current = node;
          if (typeof ref === "function") {
            ref(node);
          } else if (ref) {
            (ref as React.MutableRefObject<HTMLInputElement | null>).current =
              node;
          }
        }}
        type="password"
        {...props}
        className="w-full mt-2 bg-[#222429] rounded-md py-2 px-3" 
      />
      <button type="button" onClick={handleChange}>
        {isPasswordVisible ? (
          <Eye
            size={18}
            color="gray"
            className="absolute right-3 top-[50%] -translate-y-[30%]"
          />
        ) : (
          <EyeOff
            size={18}
            color="gray"
            className="absolute right-3 top-1/2 -translate-y-[30%]"
          />
        )}
      </button>
    </div>
  );
});

export default InputPassword;

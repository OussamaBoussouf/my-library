import { RefObject, useEffect } from "react";

export const useClickOutside = (
  ref: RefObject<HTMLElement>,
  callback: () => void,
  isVisible: boolean
) => {
  const handleClick = (e: MouseEvent) => {
    if (ref.current !== null && !ref.current?.contains(e.target as Node)) {
      callback();
    }
  };

  useEffect(() => {
    if (isVisible) document.addEventListener("mouseup", handleClick);

    return () => document.removeEventListener("mouseup", handleClick);
  }, [callback, ref]);
};

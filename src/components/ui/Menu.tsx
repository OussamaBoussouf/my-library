import {
  EllipsisVertical,
  StarHalf,
  Trash,
} from "lucide-react";
import { useClickOutside } from "../../hooks/useClickOutside";
import { memo, useRef} from "react";
import { useToggle } from "../../hooks/useToggle";

function Menu() {
  const ref = useRef<HTMLDivElement>(null);
  const {toggle, toggleExpand} = useToggle();

  useClickOutside(ref, toggleExpand, toggle);


  return (
    <>
      <div ref={ref} className="absolute top-2 right-1">
        <button
          onClick={toggleExpand}
          type="button"
          className="rounded-md hover:bg-slate-100"
        >
          <EllipsisVertical />
        </button>
        {toggle ? (
          <ul
            className="p-2 bg-white shadow-xl rounded-lg w-[150px] absolute top-[100%] right-0"
          >
            <li className="flex gap-2 mb-5 hover:bg-slate-100 p-1 rounded-md cursor-pointer">
              <StarHalf /> Favorite
            </li>
            <li className="flex gap-2 text-red-500 hover:bg-slate-100 p-1 rounded-md cursor-pointer">
              <Trash /> Delete
            </li>
          </ul>
        ) : null}
      </div>
    </>
  );
}

export default memo(Menu);

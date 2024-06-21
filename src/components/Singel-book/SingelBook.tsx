import Button from "../ui/Button";
import Menu from "../ui/Menu";
import { InfoBook } from "../../utils/type";
import { Link, useLocation } from "react-router-dom";

function SingelBook({ book }: { book: InfoBook }) {
  const path = useLocation().pathname;
  return (
    <div className="relative grid gap-y-1 row-span-3 grid-rows-subgrid">
      <Menu book={book} />
      <img
        src={book.imageUrl}
        height={336}
        width={210}
        alt="book cover"
        className="w-full h-full"
      />
      <h2 className="my-3 text-lg capitalize">{book.title}</h2>
      {path === "/dashboard/trash" ? null : (
        <Link to={`${book.fileUrl}`} target="_blank">
          <Button>Read now</Button>
        </Link>
      )}
    </div>
  );
}

export default SingelBook;

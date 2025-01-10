import Button from "../ui/Button";
import Menu from "../ui/Menu";
import { Link, useLocation } from "react-router-dom";
import { imagekitUrl } from "../../utils/imagekitUrl";
import { DocumentData } from "firebase/firestore";

function SingelBook({ book }: { book: DocumentData }) {
  const path = useLocation().pathname;

  return (
    <div className="relative grid gap-y-1 row-span-3 grid-rows-subgrid">
      <Menu book={book} />
      <img
        src={imagekitUrl(book.imageUrl)}
        alt="book cover"
        height={330}
        width={210}
        className="w-full"
      />
      {path === "/dashboard/trash" ? null : (
        <Link to={`${book.fileUrl}`} target="_blank">
          <Button className="mt-5">Read now</Button>
        </Link>
      )}
    </div>
  );
}

export default SingelBook;

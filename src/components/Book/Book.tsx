import { Link, useParams } from "react-router-dom";
import Button from "../ui/Button";
import Menu from "../ui/Menu";
import { InfoBook} from "../../utils/type";

function Book({ bookInfo } : { bookInfo: InfoBook}) {
  const url = useParams().id as string;

  return (
    <div className="w-[240px] rounded-lg relative border-[1px] py-5 text-center">
      <Menu document={bookInfo} />
      <img
        className="object-contain mx-auto w-[150px] h-[220px]"
        width={150}
        height={220}
        src={bookInfo.imageUrl}
        alt="book cover"
      />
      <p className="text-xl font-poetsenOne my-2">{bookInfo.title}</p>
      {url === "trash" ? null : (
        <Link to={`${bookInfo.fileUrl}`} target="_blank">
          <Button className="mx-auto text-sm">Read</Button>
        </Link>
      )}
    </div>
  );
}

export default Book;
